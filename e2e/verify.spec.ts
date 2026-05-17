import { expect, test } from "@playwright/test";

test("verify page renders", async ({ page }) => {
  await page.goto("/auth/verify");
  await expect(page.getByText(/tasdiqlash/i)).toBeVisible();
});
