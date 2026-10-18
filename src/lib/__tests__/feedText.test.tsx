import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderFeedText, safeHref } from '../feedText'

const show = (text: string, onHashtagClick?: (t: string) => void) =>
    render(<p data-testid="out">{renderFeedText(text, { onHashtagClick })}</p>)

describe('safeHref', () => {
    it('allows http, https and mailto only', () => {
        expect(safeHref('https://example.com/a')).toBe('https://example.com/a')
        expect(safeHref('http://example.com')).toBe('http://example.com')
        expect(safeHref('mailto:team@example.com')).toBe('mailto:team@example.com')
        expect(safeHref('javascript:alert(1)')).toBeNull()
        expect(safeHref('data:text/html,<script>1</script>')).toBeNull()
        expect(safeHref('/relative')).toBeNull()
    })

    it('refuses control characters and whitespace used to hide a scheme', () => {
        expect(safeHref('java\tscript:alert(1)')).toBeNull()
        expect(safeHref('https://example.com/a b')).toBeNull()
    })
})

describe('renderFeedText', () => {
    it('renders bold and inline code as elements', () => {
        show('a **bold** move with `nmap -sV`')
        expect(screen.getByText('bold').tagName).toBe('STRONG')
        expect(screen.getByText('nmap -sV').tagName).toBe('CODE')
    })

    it('keeps text that looks like HTML as text', () => {
        const { container } = show('<img src=x onerror=alert(1)> and <b>no</b>')
        expect(container.querySelector('img')).toBeNull()
        expect(container.querySelector('b')).toBeNull()
        expect(screen.getByTestId('out').textContent).toContain('<img src=x onerror=alert(1)>')
    })

    it('links safe markdown links and leaves javascript: links as plain text', () => {
        show('[docs](https://example.com/docs) and [bad](javascript:alert(1))')
        const link = screen.getByRole('link', { name: 'docs' })
        expect(link).toHaveAttribute('href', 'https://example.com/docs')
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
        expect(screen.queryByRole('link', { name: 'bad' })).toBeNull()
        expect(screen.getByTestId('out').textContent).toContain('[bad](javascript:alert(1))')
    })

    it('links bare URLs without the punctuation that ends the sentence', () => {
        show('see https://example.com/page, then reply.')
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', 'https://example.com/page')
        expect(screen.getByTestId('out').textContent).toBe('see https://example.com/page, then reply.')
    })

    it('makes hashtags clickable when a handler is given', () => {
        const onHashtagClick = vi.fn()
        show('learning #XSS today', onHashtagClick)
        fireEvent.click(screen.getByRole('button', { name: '#XSS' }))
        expect(onHashtagClick).toHaveBeenCalledWith('#XSS')
    })

    it('shows hashtags as plain highlighted text without a handler', () => {
        show('learning #xss')
        expect(screen.queryByRole('button')).toBeNull()
        expect(screen.getByText('#xss')).toBeInTheDocument()
    })

    it('links @mentions to the public profile and ignores email addresses', () => {
        show('thanks @Alice_01, mail me@example.com')
        expect(screen.getByRole('link', { name: '@Alice_01' })).toHaveAttribute('href', '/user/alice_01')
        expect(screen.getAllByRole('link')).toHaveLength(1)
    })

    it('returns nothing for empty text', () => {
        expect(renderFeedText('')).toEqual([])
    })
})
