import { test, expect } from "@playwright/test";

import { Common, Search } from "../lib/pom";
import Sites from "../lib/sites";

test.beforeEach(async ({ page }) => {
  await page.goto(Sites.discogsTestUrl);
  // handle oneTrust banner
  await page.click(Common.oneTrustBanner.buttonAccept);
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Discogs/);
});

test("has a search box", async ({ page }) => {
  // Expect an element "to be visible".
  await expect(page.locator(Search.searchBox)).toBeVisible();
});

test("searches for 'The Beatles' and clicks on the first result", async ({
  page,
}) => {
  // Type into search box.
  await page.fill(Search.searchBox, "The Beatles");
  await page.keyboard.press("Enter");

  // Click the first search result.
  await page.click(Search.searchResult);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Beatles/);
});
