import { chromium } from "@playwright/test";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs/promises";

const origin = "http://127.0.0.1:3000";
const sections = ["home", "about", "services", "work", "process", "contact"];

await fs.mkdir("artifacts", { recursive: true });

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3000"],
  { cwd: process.cwd(), stdio: "ignore", windowsHide: true },
);

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Production server did not become ready within 30 seconds.");
}

let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ channel: "msedge", headless: true });

  for (const target of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "laptop", width: 1366, height: 768 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport: { width: target.width, height: target.height } });
    const errors = [];

    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
    page.on("requestfailed", (request) => {
      errors.push(`request: ${request.url()} (${request.failure()?.errorText ?? "failed"})`);
    });

    await page.goto(origin, { waitUntil: "networkidle" });
    await page.screenshot({ path: `artifacts/portfolio-${target.name}-hero.png`, fullPage: false });

    if (target.name === "mobile") {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.waitForTimeout(140);
      await page.screenshot({ path: "artifacts/portfolio-mobile-menu-motion.png", fullPage: false });
      await page.waitForTimeout(260);
      await page.screenshot({ path: "artifacts/portfolio-mobile-menu.png", fullPage: false });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(240);
    }

    await page.addStyleTag({
      content: `
        .scroll-reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
        .skip-link { display: none !important; }
      `,
    });
    for (const section of sections) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(250);
    await page.screenshot({ path: `artifacts/portfolio-${target.name}-full.png`, fullPage: true });
    await page.addStyleTag({ content: ".site-nav-shell { display: none !important; }" });

    for (const section of sections) {
      const locator = page.locator(`#${section}`);
      await locator.scrollIntoViewIfNeeded();
      await locator.screenshot({ path: `artifacts/portfolio-${target.name}-${section}.png` });
    }

    await fs.writeFile(
      `artifacts/portfolio-${target.name}-errors.json`,
      JSON.stringify(errors, null, 2),
    );
    await page.close();
  }
} finally {
  await browser?.close();
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
  } else {
    server.kill("SIGTERM");
  }
}

process.exit(0);
