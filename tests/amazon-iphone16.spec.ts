import { test, expect } from '@playwright/test';

test('Amazon search iPhone 16 should show results count', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('input[id="twotabsearchtextbox"], input[name="field-keywords"]');
  await expect(searchBox).toBeVisible({ timeout: 15000 });
  await searchBox.fill('iPhone 16');
  await searchBox.press('Enter');

  // Try to locate the results-summary text (e.g., "1-48 of over 1,000 results for")
  const resultsText = page.locator('//span[contains(translate(.,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"results for") or contains(translate(.,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"result for")]').first();
  // If the results text appears, parse the numbers; otherwise fallback to counting result items
  let count = 0;
  try {
    await resultsText.waitFor({ timeout: 15000 });
    const text = (await resultsText.innerText()).trim();
    const matches = text.match(/[\d,]+/g);
    if (matches && matches.length) {
      count = parseInt(matches[matches.length - 1].replace(/,/g, ''), 10);
    }
  } catch (err) {
    // ignore; we'll fallback below
  }

  if (!count) {
    // Fallback: count visible search result items
    const items = await page.locator('[data-component-type="s-search-result"]').count();
    count = items;
  }

  console.log('Search results count:', count);
  expect(count).toBeGreaterThan(0);
});
