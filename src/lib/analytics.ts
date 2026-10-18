import { track } from '@vercel/analytics';

/** Product analytics must never break the page: no analytics script, an ad blocker or a bad value all do nothing. */
export function trackEvent(name: string, props?: Record<string, string | number | boolean | null>): void {
    try {
        track(name, props);
    } catch {
        // Nothing to do
    }
}
