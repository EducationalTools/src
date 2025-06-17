import { test, expect } from '@playwright/test';

test.describe('Games and Static Tools', () => {
	test('games listing page loads correctly', async ({ page }) => {
		await page.goto('/g');
		
		// Check if page loads without errors
		await expect(page).toHaveTitle(/EduTools|Games/i);
		
		// Check if games table or content is visible
		const gamesContainer = page.locator('[data-test="games-table"], table, .games-grid, .games-container');
		await expect(gamesContainer).toBeVisible();
		
		// Should have multiple game entries
		const gameEntries = page.locator('tbody tr, .game-card, .game-item, [data-game]');
		await expect(gameEntries).toHaveCountGreaterThan(5);
	});

	test('search functionality works', async ({ page }) => {
		await page.goto('/g');
		
		// Find search input (try multiple possible selectors)
		const searchInput = page.locator('input[placeholder*="Search"], input[type="search"], input[name*="search"], input[data-test*="search"]');
		await expect(searchInput).toBeVisible();
		
		// Test search with specific game name
		await searchInput.fill('2048');
		await page.waitForTimeout(500); // Wait for debounced search
		
		// Should filter results
		const gameEntries = page.locator('tbody tr, .game-card, .game-item, [data-game]');
		const visibleCount = await gameEntries.count();
		expect(visibleCount).toBeGreaterThan(0);
		
		// Should contain search term
		await expect(page.locator('body')).toContainText('2048');
		
		// Clear search
		await searchInput.fill('');
		await page.waitForTimeout(500);
		
		// Should show all games again
		const allGamesCount = await gameEntries.count();
		expect(allGamesCount).toBeGreaterThan(visibleCount);
	});

	test('table sorting functionality works', async ({ page }) => {
		await page.goto('/g');
		
		// Check if table headers exist
		const tableHeaders = page.locator('th, .sortable-header, [data-sortable]');
		const headerCount = await tableHeaders.count();
		
		if (headerCount > 0) {
			// Click on first sortable header
			const firstHeader = tableHeaders.first();
			await firstHeader.click();
			
			// Wait for sort to complete
			await page.waitForTimeout(300);
			
			// Click again to reverse sort
			await firstHeader.click();
			await page.waitForTimeout(300);
			
			// Should not cause errors
			await expect(page.locator('body')).not.toContainText('error');
			await expect(page.locator('.error')).not.toBeVisible();
		}
	});

	test('game navigation works', async ({ page }) => {
		await page.goto('/g');
		
		// Find first game link
		const firstGameLink = page.locator('a[href*="/g/"], .game-link, tbody tr:first-child a, .game-card a').first();
		await expect(firstGameLink).toBeVisible();
		
		// Get the href or game name
		const gameHref = await firstGameLink.getAttribute('href');
		
		// Click to navigate
		await firstGameLink.click();
		
		// Should navigate to game page
		await expect(page).toHaveURL(/\/g\/[^\/]+/);
		
		// Should not show 404
		await expect(page.locator('text=404')).not.toBeVisible();
		await expect(page.locator('text=Not Found')).not.toBeVisible();
	});

	test('individual game pages load correctly', async ({ page }) => {
		const popularGames = ['2048', 'tetris', 'minecraft', 'snake', 'pong', 'cookieclicker'];
		
		for (const game of popularGames) {
			await page.goto(`/g/${game}`);
			
			// Should not show 404 error
			await expect(page.locator('text=404')).not.toBeVisible();
			await expect(page.locator('text=Not Found')).not.toBeVisible();
			
			// Should have some content
			const bodyText = await page.locator('body').textContent();
			expect(bodyText?.length).toBeGreaterThan(100);
			
			// Check for game iframe or embedded content
			const gameContent = page.locator('iframe, canvas, .game-container, #game, .game-content');
			if (await gameContent.count() > 0) {
				await expect(gameContent.first()).toBeVisible();
			}
		}
	});

	test('games page is responsive', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667, name: 'Mobile' },
			{ width: 768, height: 1024, name: 'Tablet' },
			{ width: 1200, height: 800, name: 'Desktop' }
		];
		
		for (const viewport of viewports) {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto('/g');
			
			// Content should be visible and not overflow
			const body = page.locator('body');
			const bodyBox = await body.boundingBox();
			expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width);
			
			// Games should be accessible
			const gameEntries = page.locator('tbody tr, .game-card, .game-item, [data-game]');
			await expect(gameEntries.first()).toBeVisible();
			
			// On mobile, ensure touch targets are large enough
			if (viewport.width < 768) {
				const gameLinks = page.locator('a[href*="/g/"], .game-link');
				const firstLink = gameLinks.first();
				if (await firstLink.count() > 0) {
					const linkBox = await firstLink.boundingBox();
					expect(linkBox?.height).toBeGreaterThan(40); // Minimum touch target
				}
			}
		}
	});

	test('games page is accessible', async ({ page }) => {
		await page.goto('/g');
		
		// Check for proper heading structure
		const headings = page.locator('h1, h2, h3');
		await expect(headings.first()).toBeVisible();
		
		// Check table accessibility if table exists
		const table = page.locator('table');
		if (await table.count() > 0) {
			// Should have table headers
			await expect(page.locator('th')).toHaveCountGreaterThan(0);
			
			// Should have proper table structure
			await expect(page.locator('thead')).toBeVisible();
			await expect(page.locator('tbody')).toBeVisible();
		}
		
		// Check search input accessibility
		const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
		if (await searchInput.count() > 0) {
			const hasAriaLabel = await searchInput.getAttribute('aria-label');
			const hasAriaLabelledBy = await searchInput.getAttribute('aria-labelledby');
			const hasLabel = await page.locator('label[for]').count() > 0;
			
			expect(hasAriaLabel || hasAriaLabelledBy || hasLabel).toBeTruthy();
		}
		
		// Test keyboard navigation
		await page.keyboard.press('Tab');
		await expect(page.locator(':focus')).toBeVisible();
	});

	test('game links have proper accessibility', async ({ page }) => {
		await page.goto('/g');
		
		const gameLinks = page.locator('a[href*="/g/"]');
		const linkCount = await gameLinks.count();
		
		// Check first few links for accessibility
		for (let i = 0; i < Math.min(linkCount, 5); i++) {
			const link = gameLinks.nth(i);
			const linkText = await link.textContent();
			const ariaLabel = await link.getAttribute('aria-label');
			const title = await link.getAttribute('title');
			
			// Should have accessible name
			expect(linkText || ariaLabel || title).toBeTruthy();
			
			// Should have proper href
			const href = await link.getAttribute('href');
			expect(href).toMatch(/\/g\/[^\/]+/);
		}
	});

	test('game filtering by categories works', async ({ page }) => {
		await page.goto('/g');
		
		// Look for category filters or tags
		const categoryFilters = page.locator('[data-test="category-filter"], .category-btn, .tag-filter, .filter-button');
		const filterCount = await categoryFilters.count();
		
		if (filterCount > 0) {
			// Click first category filter
			await categoryFilters.first().click();
			await page.waitForTimeout(500);
			
			// Should filter games
			const gameEntries = page.locator('tbody tr, .game-card, .game-item');
			await expect(gameEntries).toHaveCountGreaterThan(0);
			
			// Should show filtered results
			const activeFilter = page.locator('.active-filter, .selected-filter, [data-active="true"]');
			if (await activeFilter.count() > 0) {
				await expect(activeFilter).toBeVisible();
			}
		}
	});

	test('game page back navigation works', async ({ page }) => {
		await page.goto('/g');
		
		// Navigate to a game
		const firstGameLink = page.locator('a[href*="/g/"]').first();
		await firstGameLink.click();
		
		// Should be on game page
		await expect(page).toHaveURL(/\/g\/[^\/]+/);
		
		// Go back
		await page.goBack();
		
		// Should be back on games listing
		await expect(page).toHaveURL('/g');
	});

	test('static game tools load properly', async ({ page }) => {
		// Test that static games from tools directory are accessible
		const staticGames = ['2048', 'tetris', 'cookieclicker', 'floppybird'];
		
		for (const game of staticGames) {
			await page.goto(`/g/${game}`);
			
			// Wait for any iframes to load
			await page.waitForTimeout(2000);
			
			// Should not have JavaScript errors
			const errors: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});
			
			// Should have some interactive content
			const interactiveContent = page.locator('iframe, canvas, button, .game-area, #gameContainer');
			if (await interactiveContent.count() > 0) {
				await expect(interactiveContent.first()).toBeVisible();
			}
			
			// Check that no critical errors occurred
			expect(errors.filter(e => !e.includes('favicon')).length).toBeLessThan(3);
		}
	});
});