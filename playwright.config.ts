import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
  },
  projects: [
    { name: "small-mobile", use: { browserName: "chromium", viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    { name: "tablet", use: { browserName: "chromium", viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: "laptop", use: { browserName: "chromium", viewport: { width: 1280, height: 800 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "wide", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
  ],
});
