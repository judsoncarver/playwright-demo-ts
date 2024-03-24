import { test, expect } from "@playwright/test";

import { Login } from "../lib/pom";
import Sites from "../lib/sites";

test.beforeEach(async ({ page }) => {
  await page.goto(Sites.discogsLoginUrl);
});

test("has log in title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Log in/);
});

test("has three primary social login options", async ({ page }) => {
  await expect(page.locator(Login.socialLoginButtonApple)).toBeVisible();
  await expect(page.locator(Login.socialLoginButtonFacebook)).toBeVisible();
  await expect(page.locator(Login.socialLoginButtonGoogle)).toBeVisible();
});

test("fails login with username and password", async ({ page }) => {
  await page.fill(Login.loginUsername, "username");
  await page.fill(Login.loginPassword, "password");
  await page.click(Login.continueButton);
  await expect(page.locator(Login.error.passwordError)).toBeVisible();
});
