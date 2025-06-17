import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  async navigateAndWait(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForToast(message?: string) {
    const toast = this.page.locator('.sonner-toast');
    await expect(toast).toBeVisible();
    if (message) {
      await expect(toast).toContainText(message);
    }
    return toast;
  }

  async toggleTheme() {
    const html = this.page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Try different possible theme toggle selectors
    const themeToggle = this.page
      .locator('[data-test="theme-toggle"], button[aria-label*="theme"], button[aria-label*="Theme"], .theme-toggle')
      .first();
    await themeToggle.click();

    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
    return newClass?.includes('dark') ? 'dark' : 'light';
  }

  async openSidebarOnMobile() {
    const sidebarTrigger = this.page
      .locator('[data-sidebar="trigger"], button[aria-label*="menu"], .sidebar-trigger, [data-test="sidebar-trigger"]')
      .first();
    if (await sidebarTrigger.isVisible()) {
      await sidebarTrigger.click();
      await expect(
        this.page.locator('[data-sidebar="sidebar"], nav, .sidebar').first()
      ).toBeVisible();
    }
  }

  async calculateExpression(expression: string) {
    const buttons = this.page.locator('button');
    for (const char of expression) {
      if (char === '=') {
        await buttons.filter({ hasText: '=' }).click();
      } else {
        await buttons.filter({ hasText: char }).click();
      }
    }
    const display = this.page
      .locator('[data-test="calculator-display"], .calculator-display, input[readonly]')
      .first();
    return (await display.inputValue()) || (await display.textContent());
  }

  async searchGames(query: string) {
    const searchInput = this.page
      .locator('input[placeholder*="Search"], input[placeholder*="search"], [data-test="search-input"]')
      .first();
    await searchInput.fill(query);
    await this.page.waitForTimeout(500); // Wait for debounced search
    return this.page.locator('tbody tr, .game-item, [data-test="game-row"]');
  }

  async checkAccessibility(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();

    const tagName = await element.evaluate(el => el.tagName.toLowerCase());

    if (['button', 'input', 'select', 'textarea'].includes(tagName)) {
      const hasText = await element.textContent();
      const hasAriaLabel = await element.getAttribute('aria-label');
      const hasAriaLabelledBy = await element.getAttribute('aria-labelledby');
      const hasTitle = await element.getAttribute('title');

      expect(hasText || hasAriaLabel || hasAriaLabelledBy || hasTitle).toBeTruthy();
    }
    return true;
  }

  async testAtViewport(width: number, height: number, testFn: () => Promise<void>) {
    await this.page.setViewportSize({ width, height });
    await testFn();
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }
}

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 },
  large: { width: 1920, height: 1080 }
};

export const POPULAR_GAMES = [
  '2048',
  'tetris',
  'minecraft',
  'cookieclicker',
  'floppybird',
  'slope'
];