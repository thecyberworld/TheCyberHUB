/**
 * Small markdown renderer shared by the forums and the blog / event previews.
 *
 * Order matters and is the reason this replaces the old regex chain:
 *   1. fenced and inline code are lifted out first, so nothing inside them is touched
 *   2. everything else is HTML-escaped before any markup is added
 *   3. links and bare URLs are lifted out, so `_` and `*` inside a URL are not emphasis
 *   4. emphasis only applies at word boundaries (`snake_case` and `__init__` stay literal)
 *
 * Links are limited to http(s) and mailto, images to https. The output is still meant to go
 * through DOMPurify before it reaches the DOM; escaping first just means a mistake here cannot
 * become markup on its own.
 */

export type MarkdownSegment =
    | { type: 'html'; html: string }
    | { type: 'code'; code: string; language: string };

const ESCAPES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

export function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

// Private-use markers cannot appear in escaped text, so placeholders never collide with input
const MARK = '';
const placeholder = (kind: string, index: number) => `${MARK}${kind}${index}${MARK}`;
const PLACEHOLDER_RE = new RegExp(`${MARK}([A-Z])(\\d+)${MARK}`, 'g');

const SAFE_LINK = /^(https?:\/\/|mailto:)/i;
const SAFE_IMAGE = /^https:\/\//i;
const BARE_URL = /\bhttps?:\/\/[^\s<>"')\]]+[^\s<>"')\].,;:!?]/g;
const LINK_CLASS = 'text-orange-400 hover:text-orange-300 underline';

/** Allowed href/src, or null. `value` is raw (not yet escaped). */
function safeUrl(value: string, pattern: RegExp): string | null {
    const url = value.trim();
    // Control characters and whitespace are how `java\tscript:` style schemes sneak through
    if (/[\u0000-\u001f\u007f\s]/.test(url)) return null;
    return pattern.test(url) ? url : null;
}

interface Stash {
    items: string[];
}

const stash = (store: Stash, kind: string, html: string) => {
    store.items.push(html);
    return placeholder(kind, store.items.length - 1);
};

function renderInline(raw: string, store: Stash): string {
    let text = raw;

    // Inline code first; its content is escaped and then left alone
    text = text.replace(/`([^`\n]+)`/g, (_, code: string) =>
        stash(store, 'C', `<code class="px-1.5 py-0.5 bg-white/10 rounded text-orange-400 text-sm font-mono">${escapeHtml(code)}</code>`)
    );

    // Images, then links. Label text is escaped here; the label may still contain emphasis, which is
    // applied later on the placeholder-free text, so links keep it plain.
    text = text.replace(/!\[([^\]\n]*)\]\(([^)\s]+)\)/g, (_, alt: string, src: string) => {
        const url = safeUrl(src, SAFE_IMAGE);
        if (!url) return escapeHtml(alt);
        return stash(store, 'I', `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" loading="lazy" referrerpolicy="no-referrer" class="max-w-full rounded-lg my-4" />`);
    });
    text = text.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
        const url = safeUrl(href, SAFE_LINK);
        if (!url) return escapeHtml(label);
        return stash(store, 'L', `<a href="${escapeHtml(url)}" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer nofollow ugc">${escapeHtml(label)}</a>`);
    });

    // Bare URLs
    text = text.replace(BARE_URL, (url) => {
        const safe = safeUrl(url, SAFE_LINK);
        if (!safe) return url;
        return stash(store, 'U', `<a href="${escapeHtml(safe)}" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer nofollow ugc">${escapeHtml(safe)}</a>`);
    });

    text = escapeHtml(text);

    // Emphasis, only at word boundaries so identifiers like snake_case and __init__ are untouched
    text = text
        .replace(/(^|[^\w*])\*\*\*(\S|\S.*?\S)\*\*\*(?![\w*])/g, '$1<strong><em>$2</em></strong>')
        .replace(/(^|[^\w*])\*\*(\S|\S.*?\S)\*\*(?![\w*])/g, '$1<strong class="text-white">$2</strong>')
        .replace(/(^|[^\w*])\*(\S|\S.*?\S)\*(?![\w*])/g, '$1<em>$2</em>')
        .replace(/(^|[^\w])__(\S|\S.*?\S)__(?!\w)/g, '$1<strong class="text-white">$2</strong>')
        .replace(/(^|[^\w])_(\S|\S.*?\S)_(?!\w)/g, '$1<em>$2</em>')
        .replace(/(^|[^\w~])~~(\S|\S.*?\S)~~(?![\w~])/g, '$1<del class="text-gray-500">$2</del>');

    return text;
}

function restore(text: string, store: Stash): string {
    // A link label can hold inline code, so stashed items may contain placeholders themselves
    let out = text;
    for (let pass = 0; pass < 3 && out.includes(MARK); pass++) {
        out = out.replace(PLACEHOLDER_RE, (_, __, index: string) => store.items[Number(index)] ?? '');
    }
    return out;
}

const PARAGRAPH_CLASS = 'text-gray-300 leading-relaxed mb-4';

function renderBlocks(text: string, store: Stash): string {
    const lines = text.split('\n');
    const out: string[] = [];
    let paragraph: string[] = [];
    let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;
    let quote: string[] = [];

    const flushParagraph = () => {
        if (paragraph.length) {
            out.push(`<p class="${PARAGRAPH_CLASS}">${paragraph.map((l) => renderInline(l, store)).join('<br />')}</p>`);
            paragraph = [];
        }
    };
    const flushList = () => {
        if (list) {
            const cls = list.tag === 'ul' ? 'list-disc' : 'list-decimal';
            const items = list.items.map((i) => `<li class="ml-4 ${cls} text-gray-300">${renderInline(i, store)}</li>`).join('');
            out.push(`<${list.tag} class="my-4 space-y-1">${items}</${list.tag}>`);
            list = null;
        }
    };
    const flushQuote = () => {
        if (quote.length) {
            out.push(`<blockquote class="border-l-4 border-orange-500/50 pl-4 py-1 my-4 text-gray-400 italic">${quote.map((l) => renderInline(l, store)).join('<br />')}</blockquote>`);
            quote = [];
        }
    };
    const flushAll = () => {
        flushParagraph();
        flushList();
        flushQuote();
    };

    for (const line of lines) {
        const raw = line.trimEnd();
        let m: RegExpMatchArray | null;

        if (raw.trim() === '') {
            flushAll();
        } else if (raw.startsWith(MARK) && raw.endsWith(MARK) && /^B\d+$/.test(raw.trim())) {
            // A lifted fenced block sitting on its own line
            flushAll();
            out.push(raw.trim());
        } else if ((m = raw.match(/^(#{1,3})\s+(.+)$/))) {
            flushAll();
            const level = m[1].length;
            const cls = level === 1 ? 'text-2xl font-bold text-white mt-6 mb-4'
                : level === 2 ? 'text-xl font-semibold text-white mt-6 mb-3'
                    : 'text-lg font-semibold text-white mt-6 mb-2';
            out.push(`<h${level} class="${cls}">${renderInline(m[2], store)}</h${level}>`);
        } else if (/^(-{3,}|\*{3,}|_{3,})$/.test(raw.trim())) {
            flushAll();
            out.push('<hr class="border-white/10 my-6" />');
        } else if ((m = raw.match(/^>\s?(.*)$/))) {
            flushParagraph();
            flushList();
            quote.push(m[1]);
        } else if ((m = raw.match(/^\s*[-*+]\s+(.+)$/))) {
            flushParagraph();
            flushQuote();
            if (!list || list.tag !== 'ul') {
                flushList();
                list = { tag: 'ul', items: [] };
            }
            list.items.push(m[1]);
        } else if ((m = raw.match(/^\s*\d+[.)]\s+(.+)$/))) {
            flushParagraph();
            flushQuote();
            if (!list || list.tag !== 'ol') {
                flushList();
                list = { tag: 'ol', items: [] };
            }
            list.items.push(m[1]);
        } else {
            flushList();
            flushQuote();
            paragraph.push(raw);
        }
    }
    flushAll();
    return out.join('');
}

const FENCE = /^[ \t]*```([\w+#.-]*)[^\n]*\n([\s\S]*?)^[ \t]*```[ \t]*$/gm;

/**
 * Render markdown to segments: prose as sanitisable HTML, fenced code as plain code, so the
 * caller can show code with its own component and copy button.
 */
export function renderMarkdownSegments(source: string): MarkdownSegment[] {
    const input = String(source ?? '').replace(/\r\n?/g, '\n').replace(//g, '');
    const segments: MarkdownSegment[] = [];
    const store: Stash = { items: [] };

    let last = 0;
    const flushProse = (prose: string) => {
        if (prose.trim() === '') return;
        const html = restore(renderBlocks(prose, store), store);
        if (html) segments.push({ type: 'html', html });
    };

    for (const match of Array.from(input.matchAll(FENCE))) {
        const index = match.index ?? 0;
        flushProse(input.slice(last, index));
        segments.push({ type: 'code', code: match[2].replace(/\n$/, ''), language: (match[1] || 'text').toLowerCase() });
        last = index + match[0].length;
    }
    flushProse(input.slice(last));
    return segments;
}

/** HTML string version (previews). Fenced code becomes a plain `<pre><code>`. */
export function renderMarkdownToHtml(source: string): string {
    return renderMarkdownSegments(source)
        .map((segment) =>
            segment.type === 'html'
                ? segment.html
                : `<pre class="bg-black/50 border border-white/10 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-orange-400 text-sm font-mono">${escapeHtml(segment.code)}</code></pre>`
        )
        .join('');
}
