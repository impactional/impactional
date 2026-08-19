import { expect, test } from "@playwright/test";

// iOS Low Power Mode makes Safari report prefers-reduced-motion: reduce for the whole
// browser, which used to silently disable every animation on the site.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("scroll motion still runs when the OS forces reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");

  const reveal = page.locator(".mission__intro");
  await expect(reveal).toHaveCSS("opacity", "0");

  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveCSS("opacity", "1", { timeout: 5000 });
});

test("?motion=off still disables everything", async ({ page }) => {
  await page.goto("/?motion=off");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(page.locator(".mission__intro")).toHaveCSS("opacity", "1");
});
