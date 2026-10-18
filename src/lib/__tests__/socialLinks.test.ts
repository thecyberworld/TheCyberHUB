import { describe, expect, it } from 'vitest'
import { normalizeHandle, safeWebsite, socialHref } from '../socialLinks'

describe('normalizeHandle', () => {
    it('keeps a bare handle and drops a leading @', () => {
        expect(normalizeHandle('github', 'octocat')).toBe('octocat')
        expect(normalizeHandle('twitter', '@ada_l')).toBe('ada_l')
        expect(normalizeHandle('github', '  octocat  ')).toBe('octocat')
    })

    it('takes the handle out of a pasted profile URL', () => {
        expect(normalizeHandle('github', 'https://github.com/octocat')).toBe('octocat')
        expect(normalizeHandle('github', 'github.com/octocat/repo')).toBe('octocat')
        expect(normalizeHandle('twitter', 'https://x.com/ada')).toBe('ada')
        expect(normalizeHandle('twitter', 'https://twitter.com/ada?lang=en')).toBe('ada')
        expect(normalizeHandle('linkedin', 'https://www.linkedin.com/in/ada-lovelace/')).toBe('ada-lovelace')
    })

    it('rejects a URL for another site and anything that is not a handle', () => {
        expect(normalizeHandle('github', 'https://evil.example/octocat')).toBe('')
        expect(normalizeHandle('github', 'https://github.com.evil.example/octocat')).toBe('')
        expect(normalizeHandle('linkedin', 'https://linkedin.com/company/acme')).toBe('')
        expect(normalizeHandle('github', 'a b')).toBe('')
        expect(normalizeHandle('github', '<script>')).toBe('')
        expect(normalizeHandle('github', null)).toBe('')
    })
})

describe('socialHref', () => {
    it('builds the profile link', () => {
        expect(socialHref('github', '@octocat')).toBe('https://github.com/octocat')
        expect(socialHref('twitter', 'ada')).toBe('https://x.com/ada')
        expect(socialHref('linkedin', 'ada-l')).toBe('https://www.linkedin.com/in/ada-l')
    })
    it('is null when there is nothing valid to link', () => {
        expect(socialHref('github', '')).toBeNull()
        expect(socialHref('github', 'javascript:alert(1)')).toBeNull()
    })
})

describe('safeWebsite', () => {
    it('only passes http and https', () => {
        expect(safeWebsite('https://ada.dev')).toBe('https://ada.dev/')
        expect(safeWebsite('http://ada.dev/x')).toBe('http://ada.dev/x')
        expect(safeWebsite('javascript:alert(1)')).toBeNull()
        expect(safeWebsite('data:text/html,hi')).toBeNull()
        expect(safeWebsite('not a url')).toBeNull()
        expect(safeWebsite(null)).toBeNull()
    })
})
