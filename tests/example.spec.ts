import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('http://localhost:4173/');

	await expect(page.locator('h1')).toContainText('EduTools');
	await expect(page).toHaveTitle(/EduTools/);
});

test('menu before experimental features', async ({ page }) => {
	await page.goto('http://localhost:4173/');

	await expect(page.getByText('Tools', { exact: true })).toBeVisible();
	await expect(page.getByText('Home', { exact: true })).toBeVisible();
	await expect(page.getByText('Gmaes', { exact: true })).not.toBeVisible();
	await expect(page).toHaveTitle(/EduTools/);
});
