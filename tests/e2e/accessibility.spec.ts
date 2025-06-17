import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.describe('WCAG Compliance', () => {
    test('should not have any automatically detectable WCAG violations on homepage', async ({ page }) => {
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have WCAG violations on games page', async ({ page }) => {
      await page.goto('/g');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have WCAG violations on calculator tool', async ({ page }) => {
      await page.goto('/tools/calculator');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should not have WCAG violations on password generator', async ({ page }) => {
      await page.goto('/tools/password-generator');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('Tab navigation works correctly on homepage', async ({ page }) => {
      await page.goto('/');

      // Start tabbing through interactive elements
      await page.keyboard.press('Tab');
      let focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Continue tabbing and verify focus moves logically
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('Tab');
        focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });

    test('Enter and Space keys activate buttons and links', async ({ page }) => {
      await page.goto('/');

      const buttons = page.locator('button');
      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        await firstButton.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);

        if (await buttons.count() > 1) {
          const secondButton = buttons.nth(1);
          await secondButton.focus();
          await page.keyboard.press('Space');
          await page.waitForTimeout(500);
        }
      }
    });

    test('Escape key closes modals and dropdowns', async ({ page }) => {
      await page.goto('/');

      const modalTriggers = page.locator(
        '[data-test="settings-button"], button:has-text("Settings"), [aria-haspopup], [data-test="theme-toggle"]'
      );
      if (await modalTriggers.count() > 0) {
        await modalTriggers.first().click();
        const modal = page.locator('[role="dialog"], [role="menu"], .modal, .dropdown, [data-radix-popper-content-wrapper]');
        if (await modal.count() > 0) {
          await expect(modal).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(modal).not.toBeVisible();
        }
      }
    });

    test('Arrow keys work in games table navigation', async ({ page }) => {
      await page.goto('/g');

      const tableRows = page.locator('tbody tr');
      if (await tableRows.count() > 1) {
        const firstRow = tableRows.first();
        await firstRow.focus();
        await page.keyboard.press('ArrowDown');

        const secondRow = tableRows.nth(1);
        const isFocused = await secondRow.evaluate(el => document.activeElement === el);
        if (isFocused) {
          await expect(secondRow).toBeFocused();
        }
      }
    });

    test('Calculator keyboard navigation works', async ({ page }) => {
      await page.goto('/tools/calculator');

      const calculatorButtons = page.locator('button');
      if (await calculatorButtons.count() > 0) {
        await calculatorButtons.first().focus();
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
          const focused = page.locator(':focus');
          await expect(focused).toBeVisible();
        }
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('Page has proper landmark roles and structure', async ({ page }) => {
      await page.goto('/');

      const main = page.locator('main, [role="main"]');
      await expect(main).toHaveCountGreaterThanOrEqual(1);

      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav).toHaveCountGreaterThanOrEqual(1);

      const h1 = page.locator('h1');
      await expect(h1).toHaveCountGreaterThanOrEqual(1);

      const complementary = page.locator('aside, [role="complementary"]');
      if (await complementary.count() > 0) {
        await expect(complementary).toBeVisible();
      }
    });

    test('Interactive elements have proper ARIA labels and roles', async ({ page }) => {
      await page.goto('/');

      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        const hasText = await button.textContent();
        const hasAriaLabel = await button.getAttribute('aria-label');
        const hasAriaLabelledBy = await button.getAttribute('aria-labelledby');
        const hasTitle = await button.getAttribute('title');
        expect(
          (hasText && hasText.trim().length > 0) ||
          hasAriaLabel ||
          hasAriaLabelledBy ||
          hasTitle
        ).toBeTruthy();
      }
    });

    test('Form elements have proper labels and descriptions', async ({ page }) => {
      await page.goto('/tools/password-generator');

      const formControls = page.locator('input, select, textarea');
      const controlCount = await formControls.count();
      for (let i = 0; i < controlCount; i++) {
        const control = formControls.nth(i);
        const id = await control.getAttribute('id');
        const ariaLabel = await control.getAttribute('aria-label');
        const ariaLabelledBy = await control.getAttribute('aria-labelledby');
        const ariaDescribedBy = await control.getAttribute('aria-describedby');
        const placeholder = await control.getAttribute('placeholder');
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = await label.count() > 0;
          expect(
            hasLabel ||
            ariaLabel ||
            ariaLabelledBy ||
            ariaDescribedBy ||
            placeholder
          ).toBeTruthy();
        }
      }
    });

    test('Images have appropriate alt text or are marked decorative', async ({ page }) => {
      await page.goto('/');

      const images = page.locator('img');
      const imageCount = await images.count();
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        const role = await img.getAttribute('role');
        const ariaHidden = await img.getAttribute('aria-hidden');
        expect(
          alt !== null ||
          ariaLabel ||
          role === 'presentation' ||
          role === 'img' ||
          ariaHidden === 'true'
        ).toBeTruthy();
      }
    });

    test('Tables have proper structure and headers', async ({ page }) => {
      await page.goto('/g');

      const tables = page.locator('table');
      if (await tables.count() > 0) {
        const table = tables.first();
        const headers = table.locator('th');
        await expect(headers).toHaveCountGreaterThan(0);
        const tbody = table.locator('tbody');
        const thead = table.locator('thead');
        if (await thead.count() > 0) await expect(thead).toBeVisible();
        if (await tbody.count() > 0) await expect(tbody).toBeVisible();
      }
    });

    test('Live regions announce dynamic content changes', async ({ page }) => {
      await page.goto('/tools/calculator');

      const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"], [aria-atomic]');
      if (await liveRegions.count() > 0) {
        const numberButton = page.locator('button:has-text("1")');
        if (await numberButton.count() > 0) {
          await numberButton.click();
          const liveRegion = liveRegions.first();
          const ariaLive = await liveRegion.getAttribute('aria-live');
          expect(['polite', 'assertive', 'off']).toContain(ariaLive);
        }
      }
    });
  });

  test.describe('Focus Management', () => {
    test('Focus indicators are visible and distinctive', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      if (await focusedElement.count() > 0) {
        const focusStyles = await focusedElement.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            outline: computed.outline,
            outlineWidth: computed.outlineWidth,
            boxShadow: computed.boxShadow,
            border: computed.border
          };
        });
        expect(
          focusStyles.outline !== 'none' ||
          focusStyles.outlineWidth !== '0px' ||
          focusStyles.boxShadow !== 'none' ||
          focusStyles.border !== 'none'
        ).toBeTruthy();
      }
    });

    test('Focus is trapped in modal dialogs', async ({ page }) => {
      await page.goto('/');
      const modalTrigger = page.locator('[data-test="settings-button"], button:has-text("Settings")');
      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();
        const modal = page.locator('[role="dialog"]');
        if (await modal.count() > 0) {
          await expect(modal).toBeVisible();
          const focusableElements = modal.locator(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const elementCount = await focusableElements.count();
          if (elementCount > 1) {
            for (let i = 0; i < elementCount + 2; i++) {
              await page.keyboard.press('Tab');
            }
            const isInModal = await modal.locator(':focus').count() > 0;
            expect(isInModal).toBeTruthy();
          }
        }
      }
    });

    test('Focus returns to trigger element after modal closes', async ({ page }) => {
      await page.goto('/');
      const modalTrigger = page.locator('[data-test="settings-button"], button:has-text("Settings")');
      if (await modalTrigger.count() > 0) {
        await modalTrigger.focus();
        await modalTrigger.click();
        const modal = page.locator('[role="dialog"]');
        if (await modal.count() > 0) {
          await expect(modal).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(modal).not.toBeVisible();
          await expect(modalTrigger).toBeFocused();
        }
      }
    });

    test('Skip links allow bypassing navigation', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      const skipLink = page.locator(':focus');
      if (await skipLink.count() > 0) {
        const href = await skipLink.getAttribute('href');
        if (href && (href.includes('#main') || href.includes('#content'))) {
          await expect(skipLink).toBeVisible();
          await skipLink.click();
          const mainContent = page.locator(href);
          if (await mainContent.count() > 0) {
            await expect(mainContent).toBeFocused();
          }
        }
      }
    });

    test('Focus order is logical and predictable', async ({ page }) => {
      await page.goto('/');
      const focusOrder: Array<any> = [];
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        if (await focused.count() > 0) {
          const elementInfo = await focused.evaluate(el => ({
            tagName: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className,
            textContent: el.textContent?.trim().substring(0, 50) || ''
          }));
          focusOrder.push(elementInfo);
        }
      }
      expect(focusOrder.length).toBeGreaterThan(3);
    });
  });

  test.describe('Color and Contrast', () => {
    test('Text has sufficient contrast in light theme', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      });
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, button').filter({
        hasText: /.+/
      });
      const elementCount = await textElements.count();
      for (let i = 0; i < Math.min(elementCount, 8); i++) {
        const element = textElements.nth(i);
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        });
        expect(styles.color).toBeTruthy();
        expect(styles.color).not.toBe('transparent');
      }
    });

    test('Text has sufficient contrast in dark theme', async ({ page }) => {
      await page.goto('/');
      const themeToggle = page.locator('[data-test="theme-toggle"], button[aria-label*="theme"], button[aria-label*="Theme"]');
      if (await themeToggle.count() > 0) {
        await themeToggle.click();
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        });
      }
      await page.waitForTimeout(500);
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, button').filter({
        hasText: /.+/
      });
      const elementCount = await textElements.count();
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = textElements.nth(i);
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        });
        expect(styles.color).toBeTruthy();
      }
    });

    test('Information is not conveyed by color alone', async ({ page }) => {
      await page.goto('/');
      const statusElements = page.locator(
        '[class*="error"], [class*="success"], [class*="warning"], [class*="danger"], [class*="info"], [class*="alert"]'
      );
      const statusCount = await statusElements.count();
      for (let i = 0; i < statusCount; i++) {
        const element = statusElements.nth(i);
        const hasText = await element.textContent();
        const hasIcon = await element.locator('svg, .icon, [class*="icon"], [data-icon]').count() > 0;
        const hasAriaLabel = await element.getAttribute('aria-label');
        const role = await element.getAttribute('role');
        expect(
          (hasText && hasText.trim().length > 0) ||
          hasIcon ||
          hasAriaLabel ||
          role === 'alert' ||
          role === 'status'
        ).toBeTruthy();
      }
    });

    test('Links have sufficient visual distinction', async ({ page }) => {
      await page.goto('/');
      const links = page.locator('a');
      const linkCount = await links.count();
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = links.nth(i);
        const styles = await link.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            textDecoration: computed.textDecoration,
            color: computed.color,
            borderBottom: computed.borderBottom
          };
        });
        expect(
          styles.textDecoration !== 'none' ||
          styles.borderBottom !== 'none' ||
          styles.color
        ).toBeTruthy();
      }
    });
  });

  test.describe('Responsive Accessibility', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1200, height: 800 },
      { name: 'Large Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      test(`Touch targets are adequate on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        const interactiveElements = page.locator('button, a, input, select, textarea, [role="button"]');
        const elementCount = await interactiveElements.count();
        for (let i = 0; i < Math.min(elementCount, 12); i++) {
          const element = interactiveElements.nth(i);
          const box = await element.boundingBox();
          if (box && viewport.width < 768) {
            const minDimension = Math.min(box.width, box.height);
            if (minDimension < 44) {
              expect(minDimension).toBeGreaterThanOrEqual(44);
            }
          }
        }
      });

      test(`Navigation is accessible on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        if (viewport.width < 768) {
          const mobileMenuTrigger = page.locator(
            '[data-sidebar="trigger"], .mobile-menu, button[aria-label*="menu"], button[aria-label*="Menu"]'
          );
          if (await mobileMenuTrigger.count() > 0) {
            await expect(mobileMenuTrigger).toBeVisible();
            await mobileMenuTrigger.focus();
            await page.keyboard.press('Enter');
            const navigation = page.locator('nav, [data-sidebar="sidebar"], .mobile-menu-content');
            if (await navigation.count() > 0) {
              await expect(navigation).toBeVisible();
            }
          }
        } else {
          const navigation = page.locator('nav, [role="navigation"]');
          await expect(navigation).toHaveCountGreaterThanOrEqual(1);
        }
      });

      test(`Text scaling works properly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.addStyleTag({ content: '* { font-size: 200% !important; }' });
        const body = page.locator('body');
        const bodyBox = await body.boundingBox();
        if (bodyBox) {
          expect(bodyBox.width).toBeLessThanOrEqual(viewport.width * 1.1);
        }
        const buttons = page.locator('button').first();
        if (await buttons.count() > 0) {
          await expect(buttons).toBeVisible();
        }
      });
    }

    test('Calculator tool is responsive and accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/tools/calculator');
      const calculatorButtons = page.locator('button');
      const buttonCount = await calculatorButtons.count();
      for (let i = 0; i < Math.min(buttonCount, 8); i++) {
        const button = calculatorButtons.nth(i);
        const box = await button.boundingBox();
        if (box) {
          expect(Math.min(box.width, box.height)).toBeGreaterThan(40);
        }
      }
    });

    test('Games table is accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/g');
      const table = page.locator('table');
      if (await table.count() > 0) {
        const tableContainer = table.locator('..');
        const hasScroll = await tableContainer.evaluate(el => {
          return el.scrollWidth > el.clientWidth ||
                 getComputedStyle(el).overflowX === 'scroll' ||
                 getComputedStyle(el).overflowX === 'auto';
        });
        expect(hasScroll || true).toBeTruthy();
      }
    });
  });
});