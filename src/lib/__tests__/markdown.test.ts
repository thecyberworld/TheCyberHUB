import { describe, it, expect } from 'vitest';
import DOMPurify from 'dompurify';
import { renderMarkdownSegments, renderMarkdownToHtml, escapeHtml } from '../markdown';

const html = (md: string) => renderMarkdownToHtml(md);

describe('markdown renderer', () => {
    it('renders fenced code as a code segment and leaves the content literal', () => {
        const segments = renderMarkdownSegments('Intro\n\n```python\nprint("<b>hi</b>")\n```\n\nOutro');
        expect(segments.map((s) => s.type)).toEqual(['html', 'code', 'html']);
        const code = segments[1];
        expect(code).toMatchObject({ type: 'code', language: 'python', code: 'print("<b>hi</b>")' });
    });

    it('does not apply emphasis or links inside code', () => {
        const out = html('Use `a_b_c **x** [l](https://e.com)` here\n\n```\n__init__ *x* _y_\n```');
        expect(out).toContain('a_b_c **x** [l](https://e.com)');
        expect(out).toContain('__init__ *x* _y_');
        expect(out).not.toContain('<em>');
        expect(out).not.toContain('<strong');
    });

    it('keeps snake_case, intraword underscores and URLs with underscores intact', () => {
        const out = html('call my_function_name and my__var__name then https://example.com/a_b_c/d_e');
        expect(out).not.toContain('<em>');
        expect(out).toContain('my_function_name');
        expect(out).toContain('my__var__name');
        expect(out).toContain('href="https://example.com/a_b_c/d_e"');
    });

    it('still renders real emphasis', () => {
        const out = html('**bold** and *italic* and _also italic_ and ~~gone~~ and ***both***');
        expect(out).toContain('<strong class="text-white">bold</strong>');
        expect(out).toContain('<em>italic</em>');
        expect(out).toContain('<em>also italic</em>');
        expect(out).toContain('<del class="text-gray-500">gone</del>');
        expect(out).toContain('<strong><em>both</em></strong>');
    });

    it('renders headings, lists, quotes and rules', () => {
        const out = html('# H1\n## H2\n### H3\n\n- a\n- b\n\n1. one\n2. two\n\n> quoted\n\n---');
        expect(out).toContain('<h1');
        expect(out).toContain('<h2');
        expect(out).toContain('<h3');
        expect(out).toMatch(/<ul[^>]*><li[^>]*>a<\/li><li[^>]*>b<\/li><\/ul>/);
        expect(out).toMatch(/<ol[^>]*><li[^>]*>one<\/li><li[^>]*>two<\/li><\/ol>/);
        expect(out).toContain('<blockquote');
        expect(out).toContain('<hr');
    });

    it('keeps single newlines as line breaks inside a paragraph', () => {
        expect(html('line one\nline two')).toContain('line one<br />line two');
    });

    it('allows http, https and mailto links only', () => {
        expect(html('[ok](https://example.com/x?a=1&b=2)')).toContain('href="https://example.com/x?a=1&amp;b=2"');
        expect(html('[mail](mailto:a@b.co)')).toContain('href="mailto:a@b.co"');
        for (const bad of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>1</script>', 'vbscript:x', 'java\tscript:alert(1)', '//evil.example']) {
            const out = html(`[click](${bad})`);
            expect(out).not.toContain('href=');
            expect(out).toContain('click');
        }
    });

    it('adds noopener/nofollow to external links', () => {
        expect(html('[x](https://example.com)')).toContain('rel="noopener noreferrer nofollow ugc"');
    });

    it('allows https images only', () => {
        expect(html('![a](https://example.com/a.png)')).toContain('<img src="https://example.com/a.png"');
        expect(html('![a](http://example.com/a.png)')).not.toContain('<img');
        expect(html('![a](javascript:alert(1))')).not.toContain('<img');
    });

    it('turns every kind of injected markup into text', () => {
        const corpus = [
            '<script>alert(1)</script>',
            '<img src=x onerror=alert(1)>',
            '<svg/onload=alert(1)>',
            '<a href="javascript:alert(1)">x</a>',
            '<iframe src="https://evil.example"></iframe>',
            '"><script>alert(1)</script>',
            '<style>body{display:none}</style>',
            '[x](https://e.com" onmouseover="alert(1))',
            '![x](https://e.com/a.png" onerror="alert(1))',
        ];
        for (const payload of corpus) {
            const out = DOMPurify.sanitize(html(payload), { ADD_ATTR: ['target'] });
            const doc = new DOMParser().parseFromString(out, 'text/html');
            expect(doc.querySelector('script, iframe, style, svg')).toBeNull();
            for (const el of Array.from(doc.body.querySelectorAll('*'))) {
                for (const attr of Array.from(el.attributes)) {
                    expect(attr.name.startsWith('on')).toBe(false);
                    expect(attr.value.toLowerCase().startsWith('javascript:')).toBe(false);
                }
            }
        }
    });

    it('shows code-quoted payloads as text, not markup', () => {
        const out = html('Try `<img src=x onerror=alert(1)>` and\n\n```html\n<script>alert(1)</script>\n```');
        const doc = new DOMParser().parseFromString(DOMPurify.sanitize(out), 'text/html');
        expect(doc.querySelector('script, img')).toBeNull();
        expect(doc.body.textContent).toContain('<img src=x onerror=alert(1)>');
        expect(doc.body.textContent).toContain('<script>alert(1)</script>');
    });

    it('ignores private-use marker characters in the input', () => {
        const out = html('C0 text');
        expect(out).not.toContain('undefined');
    });

    it('handles empty and non-string input', () => {
        expect(renderMarkdownSegments('')).toEqual([]);
        expect(renderMarkdownSegments(undefined as unknown as string)).toEqual([]);
    });

    it('escapeHtml escapes the five special characters', () => {
        expect(escapeHtml(`<>&"'`)).toBe('&lt;&gt;&amp;&quot;&#39;');
    });
});
