import { expect, test } from '@playwright/test';

test.describe('The home page', () => {
  test.describe('when visited', () => {
    test('should contain the correct title', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveTitle(/Vite/);
    });
  });
});