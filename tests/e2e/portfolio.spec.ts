import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the complete, honest portfolio without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Websites that make your business easier to trust.",
  );
  await expect(page.locator("main > section")).toHaveCount(6);
  await expect(page.getByText("Ali Mahmood. Thoughtful websites, built for clarity.")).toBeVisible();
  await expect(page.getByText("Concept project", { exact: true })).toHaveCount(3);
  await expect(page.getByText(/pending/i)).toHaveCount(0);

  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);

  if (testInfo.project.name === "desktop") {
    const primaryBox = await page.getByRole("link", { name: "Start a project" }).first().boundingBox();
    expect(primaryBox).not.toBeNull();
    expect(primaryBox!.y + primaryBox!.height).toBeLessThan(768);
  }
});

test("navigation and the mobile menu reach the intended sections", async ({ page }, testInfo) => {
  await page.goto("/");

  if (testInfo.project.name === "mobile") {
    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await trigger.click();
    const mobileMenu = page.getByRole("dialog", { name: "Navigate" });
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu).toHaveCSS("animation-name", "mobile-menu-in");
    await expect(mobileMenu.getByRole("link", { name: "Home" })).toHaveCSS(
      "animation-name",
      "mobile-menu-link-in",
    );
    await page.getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.getByRole("dialog", { name: "Navigate" })).toBeHidden();

    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  } else {
    await page.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.getByRole("link", { name: "Services", exact: true })).toHaveAttribute(
      "aria-current",
      "location",
    );
  }
});

test("concept notes load locally and restore focus", async ({ page }) => {
  await page.goto("/#work");
  const trigger = page.getByRole("button", { name: "Read concept notes" }).first();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "ServiceSpark concept notes" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("#servicespark-notes-caption")).toHaveText(
    "Local concept fixture. No public repository is attached.",
  );
  await expect(dialog.getByRole("heading", { name: "The design question" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("contact validates locally and reports missing delivery configuration honestly", async ({ page }) => {
  await page.goto("/#contact");

  await page.getByRole("button", { name: "Send project details" }).click();
  await expect(page.getByText("Review the highlighted fields and try again.")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();

  await page.locator("#name").fill("Ali Test");
  await page.locator("#email").fill("ali@example.com");
  await page.locator("#company").fill("Example Studio");
  await page.locator("#projectType").selectOption("Business website");
  await page.locator("#message").fill("I need a clear website for a small service business within the next quarter.");

  const outbound: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") {
      outbound.push(`${request.method()} ${new URL(request.url()).pathname}`);
    }
  });

  const responsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      new URL(response.url()).pathname === "/api/contact",
  );
  await page.getByRole("button", { name: "Send project details" }).click();
  const response = await responsePromise;

  expect(response.status()).toBe(503);
  await expect(page.getByText("Delivery is not configured in this deployment.")).toBeVisible();
  expect(outbound).toEqual(["POST /api/contact"]);
});

test("contact endpoint validates on the server and absorbs honeypot submissions", async ({ request }) => {
  const invalid = await request.post("/api/contact", {
    data: {
      name: "",
      email: "not-an-email",
      company: "",
      projectType: "Unknown",
      message: "",
      website: "",
    },
  });
  expect(invalid.status()).toBe(400);
  const invalidPayload = await invalid.json();
  expect(invalidPayload.code).toBe("VALIDATION_ERROR");
  expect(invalidPayload.errors.name).toBeTruthy();
  expect(invalidPayload.errors.email).toBeTruthy();

  const honeypot = await request.post("/api/contact", {
    data: {
      name: "Automated Visitor",
      email: "bot@example.com",
      company: "",
      projectType: "Business website",
      message: "This submission should be absorbed without provider delivery.",
      website: "https://spam.example",
    },
  });
  expect(honeypot.status()).toBe(200);
  await expect(honeypot.json()).resolves.toMatchObject({ ok: true });
});

test("has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(serious).toEqual([]);
});

test("reduced motion removes spatial hero movement", async ({ browser }, testInfo) => {
  const mobile = testInfo.project.name === "mobile";
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: mobile ? { width: 390, height: 844 } : { width: 1366, height: 768 },
  });
  const page = await context.newPage();
  await page.goto("/");

  const portrait = page.locator(".portrait-stage");
  await expect(portrait).toHaveCSS("transform", "none");
  await portrait.hover({ position: { x: 40, y: 40 } });
  await expect(portrait).toHaveCSS("transform", "none");
  if (mobile) {
    await expect(page.locator(".portrait-image-plane")).toHaveCSS("animation-name", "none");
  }

  await context.close();
});
