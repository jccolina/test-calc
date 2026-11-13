import { test, expect, Page } from '@playwright/test';

// Helper: click a calculator button by its exact visible text.
// exact: true matters so that "+" doesn't also match "+/-".
const press = async (page: Page, label: string) => {
  await page.getByRole('button', { name: label, exact: true }).click();
};

test.describe('SuperCalculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.display__value')).toHaveText('0');
  });

  test('adds two numbers: 3 + 4 = 7', async ({ page }) => {
    await press(page, '3');
    await press(page, '+');
    await press(page, '4');
    await press(page, '=');

    await expect(page.locator('.display__value')).toHaveText('7');
  });

  test('subtracts two numbers: 9 − 4 = 5', async ({ page }) => {
    await press(page, '9');
    await press(page, '−'); // note: this is the minus sign "−" (U+2212), as used in the app
    await press(page, '4');
    await press(page, '=');

    await expect(page.locator('.display__value')).toHaveText('5');
  });
});
