import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing page is complete and has no critical accessibility violations", async ({ page }) => {
  await page.goto("/?motion=off");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Building the next");
  await expect(page.locator("#programs")).toBeVisible();
  await expect(page.locator("#impact")).toContainText("3M+");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
});

test("programs remain vertically accessible on mobile and use first-party details", async ({ page }) => {
  await page.goto("/?motion=off");
  const programs = page.locator("#programs");
  await programs.scrollIntoViewIfNeeded();
  await expect(programs.getByText("Changemaker Catalyst Programme")).toBeVisible();
  await expect(programs.getByText("Peace, Education, & Global Innovation (PEGI)")).toBeVisible();
  const links = programs.getByRole("link", { name: /Discover the program/ });
  await expect(links).toHaveCount(4);
  await expect(links.first()).toHaveAttribute("href", "/programs/changemaker-catalyst-programme");
  await links.first().click();
  await expect(page).toHaveURL(/\/programs\/changemaker-catalyst-programme$/);
});

test("primary content routes have unique readable shells", async ({ page }) => {
  const routes = ["/programs", "/impact", "/media", "/ambassadors", "/people", "/partner"];
  const headings = new Set<string>();
  for (const route of routes) {
    await page.goto(`${route}?motion=off`);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    headings.add((await h1.innerText()).trim());
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1);
  }
  expect(headings.size).toBe(routes.length);
});

test("video facade defers YouTube iframe until activation", async ({ page }) => {
  await page.goto("/media?motion=off");
  await expect(page.getByText("Placeholder — replace before launch")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /Play Impactional company profile/ }).click();
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(page.locator("iframe")).toHaveAttribute("title", /Impactional company profile/);
});

test("ambassador term filter persists through the URL", async ({ page }) => {
  await page.goto("/ambassadors?term=2025&motion=off");
  await page.getByRole("button", { name: "Term 2024" }).click();
  await expect(page).toHaveURL(/term=2024/);
  await expect(page.getByText("Term 2024 profiles are awaiting approval")).toBeVisible();
});

test("impact values are server-rendered with their reporting period", async ({ page }) => {
  await page.goto("/impact?motion=off");
  await expect(page.getByText("53K+")).toBeVisible();
  await expect(page.getByText("≈$3,300")).toBeVisible();
  await expect(page.getByText("3M+", { exact: true })).toBeVisible();
  await expect(page.getByText(/2025–26 · Impactional Impact Report 2025–26/).first()).toBeVisible();
});

test("unknown program slugs show a useful not-found page", async ({ page }) => {
  await page.goto("/programs/not-a-program?motion=off");
  await expect(page.locator("body")).toContainText(/This ripple went somewhere else|404/);
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
