import { safeRedirectPath } from '@/lib/safeRedirect';

interface OnboardingUser {
    createdAt?: string;
    onboarding?: { completedAt?: string | null; skippedAt?: string | null };
}

/** A new account is one made in the last day; older members are never forced through /welcome. */
const NEW_ACCOUNT_MS = 24 * 60 * 60 * 1000;

export function needsWelcome(user: OnboardingUser | null | undefined, now = Date.now()): boolean {
    if (!user || !user.onboarding || !user.createdAt) return false;
    if (user.onboarding.completedAt || user.onboarding.skippedAt) return false;
    return now - new Date(user.createdAt).getTime() < NEW_ACCOUNT_MS;
}

/**
 * Where to go once signed in. A valid `?redirect=` always wins; otherwise a brand new member who
 * has not done the welcome flow goes there, and everyone else to `fallback`.
 */
export function landingPath(user: OnboardingUser | null | undefined, explicitRedirect: string | null | undefined, fallback = '/profile'): string {
    if (explicitRedirect) {
        const safe = safeRedirectPath(explicitRedirect, '');
        if (safe) return safe;
    }
    return needsWelcome(user) ? '/welcome' : fallback;
}
