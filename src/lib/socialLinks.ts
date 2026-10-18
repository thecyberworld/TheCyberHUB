export type SocialNetwork = 'github' | 'twitter' | 'linkedin';

const BASE: Record<SocialNetwork, string> = {
    github: 'https://github.com/',
    twitter: 'https://x.com/',
    linkedin: 'https://www.linkedin.com/in/',
};

const HOSTS: Record<SocialNetwork, RegExp> = {
    github: /^(www\.)?github\.com$/i,
    twitter: /^(www\.)?(twitter|x)\.com$/i,
    linkedin: /^([a-z]{2,3}\.)?linkedin\.com$/i,
};

/**
 * Members paste "@name", "name" or the whole profile URL; all three end up as the bare handle
 * the API stores (letters, digits, `_`, `.`, `-`). Anything else comes back empty.
 */
export function normalizeHandle(network: SocialNetwork, raw: string | null | undefined): string {
    let value = (raw ?? '').trim();
    if (!value) return '';

    if (/^https?:\/\//i.test(value) || value.includes('/')) {
        try {
            const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
            if (!HOSTS[network].test(url.hostname)) return '';
            const parts = url.pathname.split('/').filter(Boolean);
            value = network === 'linkedin' ? (parts[0] === 'in' ? parts[1] ?? '' : '') : parts[0] ?? '';
        } catch {
            return '';
        }
    }

    value = value.replace(/^@/, '');
    return /^[A-Za-z0-9_.-]{1,100}$/.test(value) ? value : '';
}

export function socialHref(network: SocialNetwork, raw: string | null | undefined): string | null {
    const handle = normalizeHandle(network, raw);
    return handle ? `${BASE[network]}${encodeURIComponent(handle)}` : null;
}

/** Only http(s) sites are linked, so a stored `javascript:` value can never become a link */
export function safeWebsite(raw: string | null | undefined): string | null {
    if (!raw) return null;
    try {
        const url = new URL(raw.trim());
        return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
    } catch {
        return null;
    }
}
