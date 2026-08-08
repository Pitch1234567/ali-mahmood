# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> navigation and the mobile menu reach the intended sections
- Location: tests\e2e\portfolio.spec.ts:28:5

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  getByRole('dialog', { name: 'Navigate' })
Expected: hidden
Received: visible
Timeout:  8000ms

Call log:
  - Expect "toBeHidden" with timeout 8000ms
  - waiting for getByRole('dialog', { name: 'Navigate' })
    19 × locator resolved to <div role="dialog" popover="auto" id="mobile-navigation-dialog" class="mobile-menu glass-surface" aria-labelledby="mobile-navigation-title">…</div>
       - unexpected value "visible"

```

```yaml
- dialog "Navigate":
  - heading "Navigate" [level=2]
  - button "Close navigation menu"
  - link "Home":
    - /url: "#home"
  - link "About":
    - /url: "#about"
  - link "Services":
    - /url: "#services"
  - link "Work":
    - /url: "#work"
  - link "Process":
    - /url: "#process"
  - link "Start a project":
    - /url: "#contact"
```

# Test source

```ts
  1   | import AxeBuilder from "@axe-core/playwright";
  2   | import { expect, test } from "@playwright/test";
  3   | 
  4   | test("renders the complete, honest portfolio without horizontal overflow", async ({ page }, testInfo) => {
  5   |   await page.goto("/");
  6   | 
  7   |   await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
  8   |     "Websites that make your business easier to trust.",
  9   |   );
  10  |   await expect(page.locator("main > section")).toHaveCount(6);
  11  |   await expect(page.getByText("Ali Mahmood. Thoughtful websites, built for clarity.")).toBeVisible();
  12  |   await expect(page.getByText("Concept project", { exact: true })).toHaveCount(3);
  13  |   await expect(page.getByText(/pending/i)).toHaveCount(0);
  14  | 
  15  |   const widths = await page.evaluate(() => ({
  16  |     document: document.documentElement.scrollWidth,
  17  |     viewport: document.documentElement.clientWidth,
  18  |   }));
  19  |   expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
  20  | 
  21  |   if (testInfo.project.name === "desktop") {
  22  |     const primaryBox = await page.getByRole("link", { name: "Start a project" }).first().boundingBox();
  23  |     expect(primaryBox).not.toBeNull();
  24  |     expect(primaryBox!.y + primaryBox!.height).toBeLessThan(768);
  25  |   }
  26  | });
  27  | 
  28  | test("navigation and the mobile menu reach the intended sections", async ({ page }, testInfo) => {
  29  |   await page.goto("/");
  30  | 
  31  |   if (testInfo.project.name === "mobile") {
  32  |     const trigger = page.getByRole("button", { name: "Open navigation menu" });
  33  |     const triggerBox = await trigger.boundingBox();
  34  |     expect(triggerBox).not.toBeNull();
  35  |     const hitTarget = await page.evaluate(({ x, y }) => {
  36  |       const target = document.elementFromPoint(x, y);
  37  |       return target?.closest("button")?.getAttribute("aria-label") ?? null;
  38  |     }, {
  39  |       x: triggerBox!.x + triggerBox!.width / 2,
  40  |       y: triggerBox!.y + triggerBox!.height / 2,
  41  |     });
  42  |     expect(hitTarget).toBe("Open navigation menu");
  43  | 
  44  |     await trigger.tap();
  45  |     const mobileMenu = page.getByRole("dialog", { name: "Navigate" });
  46  |     await expect(mobileMenu).toBeVisible();
  47  |     await expect(mobileMenu).toHaveCSS("animation-name", "mobile-menu-in");
  48  |     await expect(mobileMenu.getByRole("link", { name: "Home" })).toHaveCSS(
  49  |       "animation-name",
  50  |       "mobile-menu-link-in",
  51  |     );
  52  |     await mobileMenu.getByRole("link", { name: "Work", exact: true }).click();
  53  |     await expect(page).toHaveURL(/#work$/);
> 54  |     await expect(page.getByRole("dialog", { name: "Navigate" })).toBeHidden();
      |                                                                  ^ Error: expect(locator).toBeHidden() failed
  55  | 
  56  |     await trigger.tap();
  57  |     await page.keyboard.press("Escape");
  58  |     await expect(trigger).toBeFocused();
  59  |   } else {
  60  |     await page.getByRole("link", { name: "Services", exact: true }).click();
  61  |     await expect(page).toHaveURL(/#services$/);
  62  |     await expect(page.getByRole("link", { name: "Services", exact: true })).toHaveAttribute(
  63  |       "aria-current",
  64  |       "location",
  65  |     );
  66  |   }
  67  | });
  68  | 
  69  | test("mobile navigation opens natively before hydration", async ({ browser }, testInfo) => {
  70  |   test.skip(testInfo.project.name !== "mobile");
  71  | 
  72  |   const context = await browser.newContext({
  73  |     viewport: { width: 360, height: 640 },
  74  |     deviceScaleFactor: 3,
  75  |     hasTouch: true,
  76  |     isMobile: true,
  77  |     javaScriptEnabled: false,
  78  |   });
  79  |   const page = await context.newPage();
  80  | 
  81  |   await page.goto("/");
  82  |   await page.getByRole("button", { name: "Open navigation menu" }).tap();
  83  |   const nativeMenu = page.locator("#mobile-navigation-dialog");
  84  |   await expect(nativeMenu).toBeVisible();
  85  |   await expect(nativeMenu).toHaveAttribute("role", "dialog");
  86  |   await expect(nativeMenu.getByRole("heading", { name: "Navigate" })).toBeVisible();
  87  | 
  88  |   await context.close();
  89  | });
  90  | 
  91  | test("concept notes load locally and restore focus", async ({ page }) => {
  92  |   await page.goto("/#work");
  93  |   const trigger = page.getByRole("button", { name: "Read concept notes" }).first();
  94  |   await trigger.click();
  95  | 
  96  |   const dialog = page.getByRole("dialog", { name: "ServiceSpark concept notes" });
  97  |   await expect(dialog).toBeVisible();
  98  |   await expect(dialog.locator("#servicespark-notes-caption")).toHaveText(
  99  |     "Local concept fixture. No public repository is attached.",
  100 |   );
  101 |   await expect(dialog.getByRole("heading", { name: "The design question" })).toBeVisible();
  102 | 
  103 |   await page.keyboard.press("Escape");
  104 |   await expect(dialog).toBeHidden();
  105 |   await expect(trigger).toBeFocused();
  106 | });
  107 | 
  108 | test("contact validates locally and reports missing delivery configuration honestly", async ({ page }) => {
  109 |   await page.goto("/#contact");
  110 | 
  111 |   await page.getByRole("button", { name: "Send project details" }).click();
  112 |   await expect(page.getByText("Review the highlighted fields and try again.")).toBeVisible();
  113 |   await expect(page.locator("#name")).toBeFocused();
  114 | 
  115 |   await page.locator("#name").fill("Ali Test");
  116 |   await page.locator("#email").fill("ali@example.com");
  117 |   await page.locator("#company").fill("Example Studio");
  118 |   await page.locator("#projectType").selectOption("Business website");
  119 |   await page.locator("#message").fill("I need a clear website for a small service business within the next quarter.");
  120 | 
  121 |   const outbound: string[] = [];
  122 |   page.on("request", (request) => {
  123 |     if (request.method() !== "GET") {
  124 |       outbound.push(`${request.method()} ${new URL(request.url()).pathname}`);
  125 |     }
  126 |   });
  127 | 
  128 |   const responsePromise = page.waitForResponse(
  129 |     (response) =>
  130 |       response.request().method() === "POST" &&
  131 |       new URL(response.url()).pathname === "/api/contact",
  132 |   );
  133 |   await page.getByRole("button", { name: "Send project details" }).click();
  134 |   const response = await responsePromise;
  135 | 
  136 |   expect(response.status()).toBe(503);
  137 |   await expect(page.getByText("Delivery is not configured in this deployment.")).toBeVisible();
  138 |   expect(outbound).toEqual(["POST /api/contact"]);
  139 | });
  140 | 
  141 | test("contact endpoint validates on the server and absorbs honeypot submissions", async ({ request }) => {
  142 |   const invalid = await request.post("/api/contact", {
  143 |     data: {
  144 |       name: "",
  145 |       email: "not-an-email",
  146 |       company: "",
  147 |       projectType: "Unknown",
  148 |       message: "",
  149 |       website: "",
  150 |     },
  151 |   });
  152 |   expect(invalid.status()).toBe(400);
  153 |   const invalidPayload = await invalid.json();
  154 |   expect(invalidPayload.code).toBe("VALIDATION_ERROR");
```