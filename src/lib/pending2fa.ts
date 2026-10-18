const KEY = 'pending2faToken';

/** Hands a 2FA challenge from an OAuth callback page to the sign-in page. Session-scoped, read once. */
export function stashPending2fa(tempToken: string): void {
    try {
        sessionStorage.setItem(KEY, tempToken);
    } catch {
        // storage unavailable; the user will have to sign in again
    }
}

export function takePending2fa(): string | null {
    try {
        const tempToken = sessionStorage.getItem(KEY);
        sessionStorage.removeItem(KEY);
        return tempToken;
    } catch {
        return null;
    }
}
