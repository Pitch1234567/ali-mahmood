import { defineConfig, devices } from "@playwright/test";

const e2eOrigin = process.env.PORTFOLIO_E2E_ORIGIN ?? "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: e2eOrigin,
    channel: "msedge",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium", channel: "msedge" } },
  ],
  webServer: process.env.PORTFOLIO_E2E_EXTERNAL_SERVER
    ? undefined
    : {
        command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100",
        url: e2eOrigin,
        reuseExistingServer: false,
        timeout: 180_000,
      },
});
