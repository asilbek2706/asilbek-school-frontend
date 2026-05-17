import { expect, test } from "@playwright/test";

test("dashboard route requires auth", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/auth\/login/);
});
