import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('http://localhost:4173/');

	await expect(page).toHaveTitle(/EduTools/);
});
