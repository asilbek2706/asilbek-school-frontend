import { expect, test } from "@playwright/test";

test("github entry route redirects", async ({ page }) => {
  await page.goto("/auth/github");
  await expect(page).toHaveURL(/auth\/github\/callback|api\/auth\/github/);
});
