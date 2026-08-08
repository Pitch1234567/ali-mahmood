import { spawn, spawnSync } from "node:child_process";

const port = "3100";
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", port],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      CONTACT_ALLOWED_ORIGIN: origin,
    },
    stdio: "ignore",
    windowsHide: true,
  },
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
  throw new Error("The production test server did not become ready within 30 seconds.");
}

function stopServerTree() {
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
  } else {
    server.kill("SIGTERM");
  }
}

let exitCode = 1;

try {
  await waitForServer();
  const playwright = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PORTFOLIO_E2E_EXTERNAL_SERVER: "1",
        PORTFOLIO_E2E_ORIGIN: origin,
      },
      stdio: "inherit",
      windowsHide: true,
    },
  );

  exitCode = await new Promise((resolve, reject) => {
    playwright.once("error", reject);
    playwright.once("exit", (code) => resolve(code ?? 1));
  });
} finally {
  stopServerTree();
}

process.exit(exitCode);
