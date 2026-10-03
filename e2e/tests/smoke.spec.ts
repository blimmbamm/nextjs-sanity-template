import { expect, test } from '@playwright/test';

test('home page loads', async ({ page }) => {
	await page.goto('/en');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page).toHaveURL(/\/en\/?$/);
});
