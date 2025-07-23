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

test('menu after experimental features', async ({ page }) => {
	await page.goto('http://localhost:4173/');

	await page.getByRole('button', { name: 'Search ⌘ K' }).click();
	await page.getByPlaceholder('Type a command or search...').fill('experimental');
	await page.getByRole('option', { name: 'Toggle experimental features' }).click();
	await page.locator('#bits-c7').press('Escape');

	await expect(page.locator('a').getByText('Home', { exact: true })).toBeVisible();
	await expect(page.locator('a').getByText('Tools', { exact: true })).toBeVisible();
	await expect(page.locator('a').getByText('Gmaes', { exact: true })).toBeVisible();
	await expect(page).toHaveTitle(/EduTools/);

	// Testing all gmaes
	await page.getByText('Gmaes').click();
	await page.getByRole('link', { name: 'All Gmaes' }).click();
	await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - textbox "Search"
    - checkbox "Show ID"
    - text: Show ID
    - link "Request Gmae":
      - /url: https://github.com/EducationalTools/src/issues/new?template=gmae_request.yml
    `);
});
