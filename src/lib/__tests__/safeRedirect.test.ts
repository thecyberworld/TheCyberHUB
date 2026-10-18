import { describe, it, expect } from 'vitest';
import { safeRedirectPath } from '../safeRedirect';

describe('safeRedirectPath', () => {
    it.each(['/profile', '/mentorship/abc?tab=1', '/admin/events#top'])('keeps %s', (path) => {
        expect(safeRedirectPath(path)).toBe(path);
    });

    it.each([
        'https://evil.example',
        'http://evil.example/x',
        '//evil.example',
        '/\\evil.example',
        '\\\\evil.example',
        'javascript:alert(1)',
        'profile',
        '/path\nwith-newline',
        '',
        null,
        undefined,
    ])('falls back for %j', (value) => {
        expect(safeRedirectPath(value as string | null | undefined)).toBe('/profile');
    });

    it('uses the given fallback', () => {
        expect(safeRedirectPath('//evil.example', '/')).toBe('/');
    });
});
