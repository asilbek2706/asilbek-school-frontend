import { expect, test } from "@playwright/test";

test("register page renders", async ({ page }) => {
  await page.goto("/auth/register");
  await expect(page.getByRole("button", { name: /ro'yxatdan/i })).toBeVisible();
});
