import { expect, test } from '@playwright/test';

test.describe('The Posts page', () => {
  test.describe('when visited', () => {
    test('should contain twenty posts', async ({ page }) => {
      await page.goto('/');

      const posts = page.getByTestId('post');

      await expect (posts).toHaveCount(20);
    });
  });
});