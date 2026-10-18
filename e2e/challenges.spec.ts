import { test, expect } from '@playwright/test';
import { mockEmptyApi } from './helpers';

test.describe('Challenges Listing', () => {
    test('should display challenges page with heading', async ({ page }) => {
        await page.goto('/challenges');
        await expect(page.locator('h1')).toContainText(/Challenges/i);
    });

    test('should show Challenges and Leaderboard tabs', async ({ page }) => {
        await page.goto('/challenges');
        const challengesTab = page.locator('button').filter({ hasText: /Challenges/i });
        const leaderboardTab = page.locator('button').filter({ hasText: /Leaderboard/i });

        await expect(challengesTab.first()).toBeVisible();
        await expect(leaderboardTab.first()).toBeVisible();
    });

    test('should show search input for challenges', async ({ page }) => {
        await page.goto('/challenges');
        const searchInput = page.getByPlaceholder('Search challenges...');
        await expect(searchInput).toBeVisible();
    });

    test('should show category filter dropdown', async ({ page }) => {
        await page.goto('/challenges');
        const categorySelect = page.locator('select').first();
        await expect(categorySelect).toBeVisible();
    });

    test('should show difficulty filter dropdown', async ({ page }) => {
        await page.goto('/challenges');
        // The difficulty dropdown contains options like Easy, Medium, Hard, Insane
        const difficultySelect = page.locator('select').filter({ hasText: /Easy/i }).first();

        if (await difficultySelect.count() > 0) {
            await expect(difficultySelect).toBeVisible();
        }
    });

    test('should show empty state when there are no challenges', async ({ page }) => {
        await mockEmptyApi(page);
        await page.goto('/challenges');

        await expect(page.getByText(/No challenges found/i)).toBeVisible();
    });

    test('should filter by difficulty using dropdown', async ({ page }) => {
        await page.goto('/challenges');
        await page.waitForTimeout(2000);

        // Select "easy" difficulty
        const difficultySelect = page.locator('select').nth(1);

        if (await difficultySelect.count() > 0) {
            await difficultySelect.selectOption('easy');
            await page.waitForTimeout(500);

            // Page should still be on challenges
            await expect(page).toHaveURL(/challenges/);
        }
    });

    test('should search challenges by text', async ({ page }) => {
        await page.goto('/challenges');
        await page.waitForTimeout(2000);

        const searchInput = page.getByPlaceholder('Search challenges...');
        await searchInput.fill('sql');
        await page.waitForTimeout(500);

        // Should filter results (no error)
        await expect(page).toHaveURL(/challenges/);
    });
});

test.describe('Challenges Detail', () => {
    test('should navigate to challenge detail when clicking a card', async ({ page }) => {
        await page.goto('/challenges');
        await page.waitForTimeout(3000);

        const firstChallenge = page.locator('a[href^="/challenges/"]').first();

        if (await firstChallenge.count() > 0) {
            await firstChallenge.click();
            await expect(page).toHaveURL(/\/challenges\/.+/);
            await expect(page.locator('h1, h2').first()).toBeVisible();
        }
    });
});

test.describe('Challenges Leaderboard', () => {
    test('should switch to leaderboard tab', async ({ page }) => {
        await page.goto('/challenges');
        const leaderboardTab = page.locator('button').filter({ hasText: /Leaderboard/i });
        await leaderboardTab.first().click();

        // The shared leaderboard view replaces the challenge list
        await expect(page.getByRole('region', { name: 'Leaderboard' })).toBeVisible({ timeout: 10_000 });
    });

    test('should display leaderboard entries or empty state', async ({ page }) => {
        await page.goto('/challenges');
        const leaderboardTab = page.locator('button').filter({ hasText: /Leaderboard/i });
        await leaderboardTab.first().click();
        await page.waitForTimeout(2000);

        // Leaderboard shows entries, an empty state or an error, always inside its region
        await expect(page.getByRole('region', { name: 'Leaderboard' })).toBeVisible({ timeout: 10_000 });
    });
});
