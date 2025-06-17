import { test, expect } from '@playwright/test';

test.describe('Navigation and Layout', () => {
	test('homepage loads correctly', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/EduTools/i);

		// Check for main heading or content
		const mainContent = page.locator('main, h1, [role="main"]');
		await expect(mainContent.first()).toBeVisible();
	});

	test('sidebar navigation works', async ({ page }) => {
		await page.goto('/');

		// Test opening sidebar on mobile if trigger exists
		const sidebarTrigger = page.locator('[data-sidebar="trigger"], button[aria-label*="menu" i]');
		if (await sidebarTrigger.count() > 0 && await sidebarTrigger.isVisible()) {
			await sidebarTrigger.click();
		}

		// Navigate to games page
		const gamesLink = page.locator('a:has-text("Games"), nav a[href="/g"]');
		if (await gamesLink.count() > 0) {
			await gamesLink.first().click();
			await expect(page).toHaveURL('/g');
		}
	});

	test('theme switching works', async ({ page }) => {
		await page.goto('/');

		const html = page.locator('html');
		const initialClass = await html.getAttribute('class');

		// Find theme toggle button
		const themeToggle = page.locator('button[aria-label*="theme" i], button[title*="theme" i], [data-test="theme-toggle"]');
		if (await themeToggle.count() > 0) {
			await themeToggle.first().click();

			// Wait for theme change
			await page.waitForTimeout(100);
			const newClass = await html.getAttribute('class');
			expect(newClass).not.toBe(initialClass);
		}
	});

	test('responsive design adapts on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// Check that content fits in viewport
		const body = page.locator('body');
		const bodyBox = await body.boundingBox();
		expect(bodyBox?.width).toBeLessThanOrEqual(375);

		// Check for mobile navigation elements
		const mobileNav = page.locator('[data-sidebar="trigger"], .mobile-menu, button[aria-label*="menu" i]');
		if (await mobileNav.count() > 0) {
			await expect(mobileNav.first()).toBeVisible();
		}
	});

	test('settings functionality works', async ({ page }) => {
		await page.goto('/');

		// Look for settings button
		const settingsButton = page.locator('button[aria-label*="settings" i], [data-test="settings-button"]');
		if (await settingsButton.count() > 0) {
			await settingsButton.click();

			// Check for settings dialog/modal
			const settingsDialog = page.locator('[role="dialog"], .settings-modal, .settings-panel');
			await expect(settingsDialog.first()).toBeVisible();

			// Close with escape key
			await page.keyboard.press('Escape');
			await expect(settingsDialog.first()).not.toBeVisible();
		}
	});
});