import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing page is complete and has no critical accessibility violations", async ({ page }) => {
  await page.goto("/?motion=off");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Building the next");
  await expect(page.locator("#programs")).toBeVisible();
  await expect(page.locator("#impact")).toContainText("2,000+");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
});

test("mobile navigation opens, closes, and restores useful focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation behavior");
  await page.goto("/?motion=off");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("design system is intentionally excluded from indexing", async ({ page }) => {
  await page.goto("/design-system");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Impactional");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("the adaptive motion layer initializes without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator("#mission").scrollIntoViewIfNeeded();
  await page.locator("#impact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(errors).toEqual([]);
});
