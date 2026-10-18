/**
 * Returns `target` only when it is a same-site path, otherwise `fallback`.
 * Blocks absolute URLs, protocol-relative `//host`, and backslash tricks such as `/\host`
 * (browsers read `\` as `/`), so `?redirect=` cannot send a signed-in user off-site.
 */
export function safeRedirectPath(target: string | null | undefined, fallback = '/profile'): string {
    if (!target || !target.startsWith('/')) return fallback;
    if (target.startsWith('//') || target.includes('\\')) return fallback;
    if (/[\u0000-\u001f\u007f]/.test(target)) return fallback;
    return target;
}
