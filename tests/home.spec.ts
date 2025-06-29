import { test, expect } from '@playwright/test';

test('check homepage text and navigation items', async ({ page }) => {
	await page.goto('http://localhost:4173/');
	await expect(page.locator('h1')).toContainText('EduTools');
	await expect(page.getByText('Tools', { exact: true })).toBeVisible();
	await expect(page.getByText('Games', { exact: true })).not.toBeVisible();
	await expect(page.getByRole('button', { name: 'Search ⌘ K' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sidebar ⌘ B' })).toBeVisible();
});

test('check experimental mode', async ({ page }) => {
	await page.goto('http://localhost:4173/');
	await page.locator('body').press('ControlOrMeta+k');
	await page.getByPlaceholder('Type a command or search...').fill('experimental');
	await page.getByPlaceholder('Type a command or search...').press('Enter');
	await page.getByPlaceholder('Type a command or search...').press('Escape');
	await expect(page.locator('h1')).toContainText('EduTools Experimental');
	await expect(page.getByText('Tools', { exact: true })).toBeVisible();
	await expect(page.getByText('Games', { exact: true })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Search ⌘ K' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sidebar ⌘ B' })).toBeVisible();
});
