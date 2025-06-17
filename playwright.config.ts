"devDependencies": {
  "@playwright/test": "^1.48.0"
},
</newLines>

<rationale>
Added npm scripts for running Playwright tests in normal, UI and debug modes for convenience.
</rationale>
<newLines>
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:debug": "playwright test --debug"
},
</newLines>

<rationale>
Created a Playwright configuration file defining test directory, parallelism, CI behavior, reporter, base URL, device projects, and a dev web server.
</rationale>
<newLines>
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173
  }
});
</newLines>

<rationale>
Added navigation and layout tests to verify homepage title, sidebar links, theme toggle, and mobile responsiveness.
</rationale>
<newLines>
import { test, expect } from '@playwright/test';

test.describe('Navigation and Layout', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/EduTools/i);
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto('/');
    
    const sidebarTrigger = page.locator('[data-sidebar="trigger"]');
    if (await sidebarTrigger.isVisible()) {
      await sidebarTrigger.click();
    }
    
    await page.locator('text=Games').click();
    await expect(page).toHaveURL('/g');
    
    await page.locator('text=About').click();
    await expect(page).toHaveURL('/about');
  });

  test('theme switching works', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    await page.locator('[data-test="theme-toggle"]').click();
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const sidebar = page.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).not.toBeVisible();
    const sidebarTrigger = page.locator('[data-sidebar="trigger"]');
    await expect(sidebarTrigger).toBeVisible();
  });
});
</newLines>

<rationale>
Added tests for native tools (calculator, password generator, word counter) to ensure core functionality works as expected.
</rationale>
<newLines>
import { test, expect } from '@playwright/test';

test.describe('Native Tools', () => {
  test.describe('Calculator', () => {
    test('basic arithmetic operations work', async ({ page }) => {
      await page.goto('/tools/calculator');
      await page.locator('button:has-text("5")').click();
      await page.locator('button:has-text("+")').click();
      await page.locator('button:has-text("3")').click();
      await page.locator('button:has-text("=")').click();
      const display = page.locator('[data-test="calculator-display"]');
      await expect(display).toHaveText('8');
    });

    test('clear button works', async ({ page }) => {
      await page.goto('/tools/calculator');
      await page.locator('button:has-text("1")').click();
      await page.locator('button:has-text("2")').click();
      await page.locator('button:has-text("3")').click();
      await page.locator('button:has-text("C")').click();
      const display = page.locator('[data-test="calculator-display"]');
      await expect(display).toHaveText('0');
    });
  });

  test.describe('Password Generator', () => {
    test('generates password on page load', async ({ page }) => {
      await page.goto('/tools/password-generator');
      const passwordInput = page.locator('#password');
      const password = await passwordInput.inputValue();
      expect(password).toHaveLength(30);
      expect(password).toMatch(/[A-Za-z0-9!@#$%^&*()_+{}|:"<>?]/);
    });

    test('copy to clipboard works', async ({ page }) => {
      await page.goto('/tools/password-generator');
      await page.locator('button:has-text("Copy")').click();
      await expect(page.locator('.sonner-toast')).toBeVisible();
    });
  });

  test.describe('Word Counter', () => {
    test('counts words and characters correctly', async ({ page }) => {
      await page.goto('/tools/word-counter');
      const textarea = page.locator('textarea');
      await textarea.fill('Hello world test');
      await expect(page.locator('[data-test="word-count"]')).toContainText('3');
      await expect(page.locator('[data-test="char-count"]')).toContainText('16');
    });
  });
});
</newLines>

<rationale>
Added tests for games listing, search, individual game pages, and popular games to ensure dynamic content loads correctly.
</rationale>
<newLines>
import { test, expect } from '@playwright/test';

test.describe('Games and Static Tools', () => {
  test('games listing page loads correctly', async ({ page }) => {
    await page.goto('/g');
    await expect(page.locator('[data-test="games-table"]')).toBeVisible();
    const gameRows = page.locator('tbody tr');
    await expect(gameRows).toHaveCountGreaterThan(10);
  });

  test('search functionality works', async ({ page }) => {
    await page.goto('/g');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('2048');
    const gameRows = page.locator('tbody tr');
    await expect(gameRows).toHaveCount(1);
    await expect(page.locator('tbody')).toContainText('2048');
  });

  test('individual game page loads', async ({ page }) => {
    await page.goto('/g/2048');
    const gameFrame = page.locator('iframe');
    if (await gameFrame.count() > 0) {
      await expect(gameFrame).toBeVisible();
    } else {
      await expect(page.locator('[data-test="game-content"]')).toBeVisible();
    }
  });

  test('popular games are accessible', async ({ page }) => {
    const popularGames = ['2048', 'tetris', 'minecraft', 'cookieclicker'];
    for (const game of popularGames) {
      await page.goto(`/g/${game}`);
      await expect(page.locator('text=404')).not.toBeVisible();
      const body = await page.locator('body').textContent();
      expect(body).toBeTruthy();
    }
  });
});
</newLines>

<rationale>
Added comprehensive accessibility and responsive layout tests to ensure UI elements have proper labels, focus order, alt text, and fit within various viewports.
</rationale>
<newLines>
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage is accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const hasText = await button.textContent();
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasAriaLabelledBy = await button.getAttribute('aria-labelledby');
      expect(hasText || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
    }
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      const role = await img.getAttribute('role');
      expect(alt !== null || ariaLabel !== null || role === 'presentation').toBeTruthy();
    }
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1200, height: 800 }
  ];

  for (const viewport of viewports) {
    test(`layout works on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width);
    });
  }
});
</newLines>

<rationale>
Created shared test utilities (TestHelpers) and a VIEWPORTS constant to reduce duplication in tests.
</rationale>
<newLines>
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
    await this.page.locator('[data-test="theme-toggle"]').click();
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
    return newClass?.includes('dark') ? 'dark' : 'light';
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
    const display = this.page.locator('[data-test="calculator-display"]');
    return await display.textContent();
  }
}

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 }
};
</newLines>

<rationale>
Extended Playwright’s base test to include TestHelpers fixture for easy access to common utilities.
</rationale>
<newLines>
import { test as base } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

type TestFixtures = {
  helpers: TestHelpers;
};

export const test = base.extend<TestFixtures>({
  helpers: async ({ page }, use) => {
    const helpers = new TestHelpers(page);
    await use(helpers);
  }
});

export { expect } from '@playwright/test';
</newLines>

<rationale>
Ignored Playwright test artifacts and cache directories to keep repository clean.
</rationale>
<newLines>
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/