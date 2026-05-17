import { expect, test } from "@playwright/test";

test("offline handling placeholder", async ({ page, context }) => {
  await context.setOffline(true);
  await page.goto("/auth/login");
  await expect(page.locator("body")).toBeVisible();
  await context.setOffline(false);
});
