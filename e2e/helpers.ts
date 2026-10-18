import type { Page, Route } from '@playwright/test';

/**
 * The e2e suite runs against the Next.js app only, with no backend. These
 * helpers answer API calls with canned JSON so pages settle into a known state
 * right away instead of retrying against an unreachable API.
 */

/** The API is a different origin from the app, so every reply needs CORS headers. */
const corsHeaders = (route: Route) => ({
    'access-control-allow-origin': route.request().headers()['origin'] || '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
});

const json = (route: Route, body: unknown, status = 200) =>
    route.fulfill({
        status,
        contentType: 'application/json',
        headers: corsHeaders(route),
        body: JSON.stringify(body),
    });

/** Answers CORS preflights, which the browser sends before any JSON request. */
const preflight = (route: Route) => route.fulfill({ status: 204, headers: corsHeaders(route) });

/** Every API GET returns an empty list; other methods get a plain success. */
export async function mockEmptyApi(page: Page) {
    await page.route('**/api/**', (route) => {
        const method = route.request().method();
        if (method === 'OPTIONS') return preflight(route);
        if (method === 'GET') {
            return json(route, {
                success: true,
                data: [],
                challenges: [],
                events: [],
                pagination: { total: 0, page: 1, limit: 20, totalPages: 1, hasMore: false },
            });
        }
        return json(route, { success: true });
    });
}

export const testUser = {
    _id: 'user-1',
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    role: 'user',
    isVerified: true,
    provider: 'local',
    createdAt: '2024-01-01T00:00:00.000Z',
};

/** Starts the session signed in: stores a token and answers /api/auth/me. */
export async function signInAs(page: Page, user: Record<string, unknown> = testUser) {
    await page.addInitScript(() => window.localStorage.setItem('token', 'e2e-token'));
    await mockEmptyApi(page);
    await page.route('**/api/auth/me', (route) =>
        route.request().method() === 'OPTIONS' ? preflight(route) : json(route, { success: true, data: user })
    );
}

/** Every API call fails with 401, as an unauthenticated visitor would see. */
export async function mockUnauthorizedApi(page: Page) {
    await page.route('**/api/**', (route) =>
        route.request().method() === 'OPTIONS'
            ? preflight(route)
            : json(route, { success: false, message: 'Unauthorized' }, 401)
    );
}
