import { test, expect } from '@playwright/test';

test('should load site and have correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Thiago Filipe');
});

test('should toggle languages correctly', async ({ page }) => {
  await page.goto('/');
  
  // Verify Portuguese is default (from localStorage logic or fallback)
  await expect(page.locator('h1')).toContainText('Thiago Filipe');
  
  // Click language selector to switch to English
  const englishButton = page.getByRole('button', { name: '🇬🇧 EN' });
  await englishButton.click();
  
  // Wait a bit for React to update the DOM
  await page.waitForTimeout(500);
  
  // The 'eyebrow' in the hero should change
  await expect(page.locator('p.text-studio-candy').first()).toContainText('Software, AI and Automation');
});
