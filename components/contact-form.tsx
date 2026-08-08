"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import {
  contactLimits,
  normalizeContactValues,
  projectTypes,
  validateContactValues,
  type ContactApiResponse,
  type ContactErrors,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/contact";
import { LottieVisual } from "./lottie-visual";

type FormStatus =
  | "idle"
  | "invalid"
  | "submitting"
  | "success"
  | "configuration-error"
  | "rate-limited"
  | "error";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

interface ContactFormProps {
  deliveryConfigured: boolean;
  contactEmail?: string;
}

export function ContactForm({ deliveryConfigured, contactEmail }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [website, setWebsite] = useState("");
  const [playToken, setPlayToken] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  function updateField(field: ContactFieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  function validateField(field: ContactFieldName) {
    const nextErrors = validateContactValues(normalizeContactValues(values));
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const normalizedValues = normalizeContactValues(values);
    const nextErrors = validateContactValues(normalizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      const firstInvalid = Object.keys(nextErrors)[0] as ContactFieldName;
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const submissionId =
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...normalizedValues,
          website,
          submissionId,
        }),
        signal: controller.signal,
      });
      const payload = (await response.json()) as ContactApiResponse;

      if (response.ok && payload.ok) {
        setValues(initialValues);
        setWebsite("");
        setStatus("success");
        setPlayToken((token) => token + 1);
        return;
      }

      if (!payload.ok && payload.errors) {
        setErrors(payload.errors);
        const firstInvalid = Object.keys(payload.errors)[0] as ContactFieldName | undefined;
        if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      }

      if (!payload.ok && payload.code === "NOT_CONFIGURED") {
        setStatus("configuration-error");
      } else if (!payload.ok && payload.code === "RATE_LIMITED") {
        setStatus("rate-limited");
      } else if (!payload.ok && payload.code === "VALIDATION_ERROR") {
        setStatus("invalid");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  const fieldProps = (field: ContactFieldName) => ({
    id: field,
    name: field,
    value: values[field],
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onBlur: () => validateField(field),
  });

  const submitLabel =
    status === "submitting"
      ? "Sending securely"
      : status === "success"
        ? "Message sent"
        : "Send project details";

  return (
    <form
      className="contact-form glass-surface"
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      noValidate
    >
      <p className="delivery-disclosure">
        {deliveryConfigured
          ? "Sent directly to Ali. This site does not keep a database copy."
          : "Delivery is ready in code and activates when the launch email settings are added."}
      </p>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={website}
          tabIndex={-1}
          autoComplete="off"
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className="contact-fields-grid">
        <div className="field-group">
          <label htmlFor="name">Name</label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            maxLength={contactLimits.name}
            placeholder="Your full name"
            onChange={(event) => updateField("name", event.target.value)}
          />
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            maxLength={contactLimits.email}
            placeholder="name@example.com"
            onChange={(event) => updateField("email", event.target.value)}
          />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="company">Company <span>(optional)</span></label>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company}
            placeholder="Your company name"
            onChange={(event) => updateField("company", event.target.value)}
          />
          {errors.company && <p id="company-error" className="field-error">{errors.company}</p>}
        </div>

        <div className="field-group field-span-two">
          <label htmlFor="projectType">Project type</label>
          <select
            {...fieldProps("projectType")}
            onChange={(event) => updateField("projectType", event.target.value)}
          >
            <option value="">Choose a project type</option>
            {projectTypes.map((projectType) => (
              <option key={projectType} value={projectType}>{projectType}</option>
            ))}
          </select>
          {errors.projectType && <p id="projectType-error" className="field-error">{errors.projectType}</p>}
        </div>

        <div className="field-group field-span-full">
          <div className="field-label-row">
            <label htmlFor="message">Message</label>
            <span>{values.message.length}/{contactLimits.message}</span>
          </div>
          <textarea
            {...fieldProps("message")}
            rows={5}
            maxLength={contactLimits.message}
            placeholder="Your goal, audience, and timeline"
            onChange={(event) => updateField("message", event.target.value)}
          />
          {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
        </div>
      </div>

      <div className="contact-form-footer">
        <button className="primary-button" type="submit" disabled={status === "submitting"}>
          {submitLabel}
          <ArrowUpRight aria-hidden="true" size={19} weight="regular" />
        </button>
        <div className="contact-status" aria-live="polite">
          {status === "invalid" && <p className="status-error">Review the highlighted fields and try again.</p>}
          {status === "submitting" && <p>Sending your project details.</p>}
          {status === "success" && (
            <p className="status-success">Message sent. Your project details are now with Ali.</p>
          )}
          {status === "configuration-error" && (
            <p className="status-error">
              Delivery is not configured in this deployment.
              {contactEmail ? " Please use the direct email link." : ""}
            </p>
          )}
          {status === "rate-limited" && (
            <p className="status-error">Too many attempts. Please wait ten minutes and try again.</p>
          )}
          {status === "error" && (
            <p className="status-error">
              The message could not be sent. Please try again
              {contactEmail ? " or use the direct email link." : "."}
            </p>
          )}
          {status === "idle" && (
            <p>
              {deliveryConfigured
                ? "Ready when you are."
                : "The form will report honestly until delivery settings are configured."}
            </p>
          )}
          {contactEmail && (
            <p className="direct-email">
              Prefer email? <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          )}
        </div>
        <div className="contact-lottie-slot" data-active={status === "success"}>
          {status === "success" && (
            <LottieVisual
              src="/lottie/contact-success.lottie"
              posterSrc="/lottie/contact-poster.svg"
              label="Message delivered to Ali"
              playToken={playToken}
              className="contact-lottie"
            />
          )}
        </div>
      </div>
    </form>
  );
}
