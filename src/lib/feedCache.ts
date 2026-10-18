import type { FeedPost } from '@/types/feed';

/**
 * Helpers that update posts inside whatever the React Query cache holds for the feed: infinite
 * lists (`{ pages: [{ data: FeedPost[] }] }`) and threads (`{ root, descendants }`). Anything else
 * (comments, tags) passes through untouched.
 */

type Match = (post: FeedPost) => boolean;
type Patch = (post: FeedPost) => FeedPost;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

// Comments are cached under the same prefix and also carry `viewer`; only posts have a `type`
const isPostList = (items: unknown[]): items is FeedPost[] =>
    items.every((p) => isRecord(p) && 'type' in p && 'viewer' in p);

const mapPosts = (posts: FeedPost[], match: Match, patch: Patch) => posts.map((p) => (match(p) ? patch(p) : p));

export function mapFeedCache(data: unknown, match: Match, patch: Patch): unknown {
    if (!isRecord(data)) return data;

    if (Array.isArray(data.pages)) {
        return {
            ...data,
            pages: data.pages.map((page: unknown) =>
                isRecord(page) && Array.isArray(page.data) && isPostList(page.data)
                    ? { ...page, data: mapPosts(page.data as FeedPost[], match, patch) }
                    : page
            ),
        };
    }

    if (isRecord(data.root) && Array.isArray(data.descendants)) {
        return {
            ...data,
            root: match(data.root as unknown as FeedPost) ? patch(data.root as unknown as FeedPost) : data.root,
            descendants: mapPosts(data.descendants as FeedPost[], match, patch),
        };
    }

    return data;
}

/** Drop a post from every cached list (a thread loses a reply; its first post stays until the page leaves). */
export function removeFromFeedCache(data: unknown, id: string): unknown {
    if (!isRecord(data)) return data;

    if (Array.isArray(data.pages)) {
        return {
            ...data,
            pages: data.pages.map((page: unknown) =>
                isRecord(page) && Array.isArray(page.data) && isPostList(page.data)
                    ? { ...page, data: (page.data as FeedPost[]).filter((p) => p._id !== id) }
                    : page
            ),
        };
    }

    if (isRecord(data.root) && Array.isArray(data.descendants)) {
        return { ...data, descendants: (data.descendants as FeedPost[]).filter((p) => p._id !== id) };
    }

    return data;
}

export const withCounts = (patch: Partial<Pick<FeedPost, 'likeCount' | 'commentCount' | 'bookmarkCount' | 'reshareCount'>>): Patch =>
    (post) => ({ ...post, ...patch });

export const bump = (field: 'likeCount' | 'commentCount' | 'bookmarkCount' | 'reshareCount', by: number): Patch =>
    (post) => ({ ...post, [field]: Math.max(0, (post[field] ?? 0) + by) });
