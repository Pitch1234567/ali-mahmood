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
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();
    const hitTarget = await page.evaluate(({ x, y }) => {
      const target = document.elementFromPoint(x, y);
      return target?.closest("button")?.getAttribute("aria-label") ?? null;
    }, {
      x: triggerBox!.x + triggerBox!.width / 2,
      y: triggerBox!.y + triggerBox!.height / 2,
    });
    expect(hitTarget).toBe("Open navigation menu");

    await trigger.tap();
    const mobileMenu = page.getByRole("dialog", { name: "Navigate" });
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu).toHaveCSS("animation-name", "mobile-menu-in");
    await expect(mobileMenu.getByRole("link", { name: "Home" })).toHaveCSS(
      "animation-name",
      "mobile-menu-link-in",
    );

    await mobileMenu.getByRole("button", { name: "Close navigation menu" }).tap();
    await expect(mobileMenu).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.tap();
    await mobileMenu.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.getByRole("dialog", { name: "Navigate" })).toBeHidden();

    await trigger.tap();
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

test("mobile navigation opens natively before hydration", async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");

  const context = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 3,
    hasTouch: true,
    isMobile: true,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).tap();
  const nativeMenu = page.locator("#mobile-navigation-dialog");
  await expect(nativeMenu).toBeVisible();
  await expect(nativeMenu).toHaveAttribute("role", "dialog");
  await expect(nativeMenu.getByRole("heading", { name: "Navigate" })).toBeVisible();

  await nativeMenu.getByRole("button", { name: "Close navigation menu" }).tap();
  await expect(nativeMenu).toBeHidden();

  await context.close();
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

test("contact opens Gmail on desktop and preserves mailto on mobile", async ({ context, page }, testInfo) => {
  const desktop = testInfo.project.name === "desktop";

  if (desktop) {
    await context.route("https://mail.google.com/**", async (route) => {
      await route.fulfill({
        body: "<!doctype html><title>Gmail Compose Test</title>",
        contentType: "text/html",
        status: 200,
      });
    });
  }

  await page.addInitScript(() => {
    const nativeClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function click() {
      if (this.protocol === "mailto:") {
        Object.defineProperty(window, "__openedMailto", {
          configurable: true,
          value: this.href,
          writable: true,
        });
        return;
      }

      nativeClick.call(this);
    };
  });

  await page.goto("/#contact");

  await page.getByRole("button", { name: "Send project details" }).click();
  await expect(page.getByText("Review the highlighted fields and try again.")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();

  await page.locator("#name").fill("Ali Test");
  await page.locator("#email").fill("ali+website@example.com");
  await page.locator("#company").fill("Example Studio & Co.");
  await page.locator("#projectType").selectOption("Business website");
  await page.locator("#message").fill(
    "I need a clear website for a small service business.\nPlease include mobile booking & an Urdu contact option.",
  );

  const outbound: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") {
      outbound.push(`${request.method()} ${new URL(request.url()).pathname}`);
    }
  });

  const popupPromise = desktop ? page.waitForEvent("popup") : Promise.resolve(null);
  await page.getByRole("button", { name: "Send project details" }).click();
  const popup = await popupPromise;

  if (popup) await popup.waitForLoadState("domcontentloaded");

  await expect(page.getByText(/Email draft opened/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Open email draft again" })).toBeVisible();

  const mailtoHref = desktop
    ? undefined
    : await page.evaluate(
        () => (window as Window & { __openedMailto?: string }).__openedMailto,
      );
  const draftHref = popup?.url() ?? mailtoHref;
  expect(draftHref).toBeTruthy();

  const draft = new URL(draftHref!);

  if (desktop) {
    expect(draft.origin).toBe("https://mail.google.com");
    expect(draft.pathname).toBe("/mail/");
    expect(draft.searchParams.get("view")).toBe("cm");
    expect(draft.searchParams.get("fs")).toBe("1");
    expect(draft.searchParams.get("to")).toBe("aalimahmood2006@gmail.com");
    expect(draft.searchParams.get("su")).toBe(
      "Project enquiry: Business website from Ali Test",
    );
    await expect(popup!).toHaveTitle("Gmail Compose Test");
    expect(await popup!.opener()).toBeNull();
  } else {
    expect(draft.protocol).toBe("mailto:");
    expect(draft.pathname).toBe("aalimahmood2006@gmail.com");
    expect(draft.searchParams.get("subject")).toBe(
      "Project enquiry: Business website from Ali Test",
    );
  }

  const subject = draft.searchParams.get(desktop ? "su" : "subject");
  expect(subject).toBe(
    "Project enquiry: Business website from Ali Test",
  );

  const body = draft.searchParams.get("body");
  expect(body).toContain("Name: Ali Test");
  expect(body).toContain("Email: ali+website@example.com");
  expect(body).toContain("Company: Example Studio & Co.");
  expect(body).toContain("Project type: Business website");
  expect(body).toContain(
    "Project details:\r\nI need a clear website for a small service business.\r\nPlease include mobile booking & an Urdu contact option.",
  );

  await expect(page.locator("#name")).toHaveValue("Ali Test");
  await expect(page.locator("#message")).toHaveValue(/mobile booking/);
  expect(outbound).toEqual([]);
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
