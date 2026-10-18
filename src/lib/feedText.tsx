import React from 'react';
import Link from 'next/link';

/**
 * Renders the text of a feed post or comment: **bold**, `code`, [text](url), bare links, #hashtags
 * and @mentions. Everything is built as React elements (never as HTML), and links are limited to
 * http, https and mailto, so a `javascript:` link in a post stays plain text.
 */

const SAFE_LINK = /^(https?:\/\/|mailto:)/i;
const TOKEN =
    /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\)|https?:\/\/[^\s<>"]+|(?<![\w&])#[A-Za-z]\w{0,29}|(?<![\w@])@[A-Za-z0-9_]{1,30})/g;

const LINK_CLASS = 'text-blue-400 hover:underline break-words';

/** The href when it is safe to link to, else null. Whitespace and control characters never pass. */
export function safeHref(value: string): string | null {
    const url = value.trim();
    if (/[\u0000-\u001f\u007f\s]/.test(url)) return null;
    return SAFE_LINK.test(url) ? url : null;
}

export interface FeedTextOptions {
    onHashtagClick?: (tag: string) => void;
}

export function renderFeedText(text: string, { onHashtagClick }: FeedTextOptions = {}): React.ReactNode[] {
    if (!text) return [];
    const out: React.ReactNode[] = [];
    let last = 0;
    let key = 0;

    for (const match of Array.from(text.matchAll(TOKEN))) {
        const token = match[0];
        const index = match.index ?? 0;
        if (index > last) out.push(text.slice(last, index));
        last = index + token.length;
        key += 1;

        if (token.startsWith('**')) {
            out.push(<strong key={key} className="font-semibold text-gray-900 dark:text-white">{token.slice(2, -2)}</strong>);
        } else if (token.startsWith('`')) {
            out.push(
                <code key={key} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-orange-600 dark:text-orange-300 text-xs font-mono">
                    {token.slice(1, -1)}
                </code>
            );
        } else if (token.startsWith('[')) {
            const split = token.indexOf('](');
            const label = token.slice(1, split);
            const href = safeHref(token.slice(split + 2, -1));
            if (href) {
                out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer nofollow" className={LINK_CLASS}>{label}</a>);
            } else {
                out.push(token);
            }
        } else if (token.startsWith('http')) {
            // Sentence punctuation after a link is not part of it
            const trimmed = token.replace(/[.,;:!?)\]]+$/, '');
            const href = safeHref(trimmed);
            if (href) {
                out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer nofollow" className={LINK_CLASS}>{trimmed}</a>);
                out.push(token.slice(trimmed.length));
            } else {
                out.push(token);
            }
        } else if (token.startsWith('#')) {
            out.push(
                onHashtagClick ? (
                    <button
                        key={key}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onHashtagClick(token);
                        }}
                        className="text-orange-400 hover:underline"
                    >
                        {token}
                    </button>
                ) : (
                    <span key={key} className="text-orange-400">{token}</span>
                )
            );
        } else {
            out.push(
                <Link key={key} href={`/user/${token.slice(1).toLowerCase()}`} className="text-orange-400 hover:underline">
                    {token}
                </Link>
            );
        }
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}
