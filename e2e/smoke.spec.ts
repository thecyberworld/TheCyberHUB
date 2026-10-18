import { test, expect } from '@playwright/test';

test.describe('Smoke navigation', () => {
    test('home loads', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByText(/TheCyberHub/i).first()).toBeVisible({ timeout: 15000 });
    });

    test('tools page renders', async ({ page }) => {
        await page.goto('/tools');
        await expect(page.getByRole('heading', { name: /Security Tools/i })).toBeVisible();
        await expect(page.getByPlaceholder('Search tools...')).toBeVisible();
    });

    test('events page renders', async ({ page }) => {
        await page.goto('/events');
        await expect(page.getByText(/Upcoming Events/i)).toBeVisible();
        await expect(page.getByPlaceholder('Search events...')).toBeVisible();
    });
});
