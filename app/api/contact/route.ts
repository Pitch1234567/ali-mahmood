import { randomUUID } from "node:crypto";

import {
  normalizeContactValues,
  validateContactValues,
  type ContactApiResponse,
} from "@/lib/contact";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const maxRequestBytes = 12 * 1024;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaximum = 5;
const deliveryTimeoutMs = 10_000;

const requestsByClient = new Map<string, { count: number; resetAt: number }>();

function json(body: ContactApiResponse, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN
      ? new URL(process.env.CONTACT_ALLOWED_ORIGIN).origin
      : getSiteUrl().origin;
    return new URL(origin).origin === allowedOrigin;
  } catch {
    return false;
  }
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function consumeRateLimit(key: string) {
  const now = Date.now();

  if (requestsByClient.size > 1000) {
    for (const [client, entry] of requestsByClient) {
      if (entry.resetAt <= now) requestsByClient.delete(client);
    }
  }

  const current = requestsByClient.get(key);
  if (!current || current.resetAt <= now) {
    requestsByClient.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }

  if (current.count >= rateLimitMaximum) return false;
  current.count += 1;
  return true;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDeliveryConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  return apiKey && toEmail && fromEmail
    ? { apiKey, toEmail, fromEmail }
    : null;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "This request must come from the portfolio website.",
      },
      403,
    );
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "Send the contact form as JSON.",
      },
      415,
    );
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
    return json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "The request is too large.",
      },
      413,
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(rawBody);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "The contact details could not be read.",
      },
      400,
    );
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true, message: "Message received." }, 200);
  }

  const values = normalizeContactValues(body);
  const errors = validateContactValues(values);
  if (Object.keys(errors).length > 0) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Review the highlighted fields and try again.",
        errors,
      },
      400,
    );
  }

  if (!consumeRateLimit(clientKey(request))) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many messages were submitted. Please wait ten minutes and try again.",
      },
      429,
    );
  }

  const config = getDeliveryConfig();
  if (!config) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message: "Message delivery is not configured in this deployment.",
      },
      503,
    );
  }

  const safe = {
    name: escapeHtml(values.name),
    email: escapeHtml(values.email),
    company: escapeHtml(values.company || "Not provided"),
    projectType: escapeHtml(values.projectType),
    message: escapeHtml(values.message).replaceAll("\n", "<br />"),
  };

  const text = [
    "New portfolio enquiry",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "Not provided"}`,
    `Project type: ${values.projectType}`,
    "",
    values.message,
  ].join("\n");

  const html = `
    <h1>New portfolio enquiry</h1>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Company:</strong> ${safe.company}</p>
    <p><strong>Project type:</strong> ${safe.projectType}</p>
    <hr />
    <p>${safe.message}</p>
  `;

  const requestedId =
    typeof body.submissionId === "string" && /^[A-Za-z0-9_-]{8,128}$/.test(body.submissionId)
      ? body.submissionId
      : randomUUID();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), deliveryTimeoutMs);

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-${requestedId}`,
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [config.toEmail],
        reply_to: values.email,
        subject: `Portfolio enquiry from ${values.name}`,
        text,
        html,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!providerResponse.ok) {
      return json(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          message: "The message could not be delivered. Please try again.",
        },
        502,
      );
    }

    return json(
      {
        ok: true,
        message: "Your project details were sent successfully.",
      },
      200,
    );
  } catch {
    return json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "The message could not be delivered. Please try again.",
      },
      502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
