import { fetchApi } from '@/lib/api';
import type {
    CreatePostInput,
    FeedCommentsPage,
    FeedPage,
    FeedPost,
    FeedThread,
    FeedType,
    TrendingTag,
    FeedComment,
} from '@/types/feed';

export interface FeedQuery {
    type?: FeedType;
    hashtag?: string | null;
    cursor?: string | null;
    limit?: number;
}

export function feedPath(query: FeedQuery): string {
    const params = new URLSearchParams();
    // `all` is the server default
    if (query.type && query.type !== 'all') params.set('type', query.type);
    if (query.hashtag) params.set('hashtag', query.hashtag.replace(/^#/, ''));
    if (query.cursor) params.set('cursor', query.cursor);
    params.set('limit', String(query.limit ?? 20));
    return `/api/feed?${params.toString()}`;
}

/** Public. The token (if any) is sent, so every post carries the viewer's own state. */
export function getFeed(query: FeedQuery): Promise<FeedPage> {
    return fetchApi(feedPath(query));
}

export function getBookmarks(cursor?: string | null): Promise<FeedPage> {
    const params = new URLSearchParams({ limit: '20' });
    if (cursor) params.set('cursor', cursor);
    return fetchApi(`/api/feed/bookmarks?${params.toString()}`);
}

export function getUserPosts(username: string, cursor?: string | null): Promise<FeedPage> {
    const params = new URLSearchParams({ limit: '20' });
    if (cursor) params.set('cursor', cursor);
    return fetchApi(`/api/feed/user/${encodeURIComponent(username)}?${params.toString()}`);
}

export function getThread(id: string): Promise<FeedThread> {
    return fetchApi(`/api/feed/posts/${encodeURIComponent(id)}/thread`);
}

export async function getTrendingTags(): Promise<TrendingTag[]> {
    const res = await fetchApi('/api/feed/trending', { requireAuth: false });
    return res?.data ?? [];
}

export function createPost(input: CreatePostInput): Promise<{ success: boolean; data: FeedPost }> {
    return fetchApi('/api/feed/posts', { method: 'POST', body: JSON.stringify(input) });
}

export function deletePost(id: string): Promise<unknown> {
    return fetchApi(`/api/feed/posts/${id}`, { method: 'DELETE' });
}

export function toggleLike(id: string): Promise<{ success: boolean; data: { liked: boolean; likeCount: number } }> {
    return fetchApi(`/api/feed/posts/${id}/like`, { method: 'POST' });
}

export function toggleBookmark(id: string): Promise<{ success: boolean; data: { bookmarked: boolean; bookmarkCount: number } }> {
    return fetchApi(`/api/feed/posts/${id}/bookmark`, { method: 'POST' });
}

export function resharePost(id: string, comment: string): Promise<{ success: boolean; data: FeedPost }> {
    return fetchApi(`/api/feed/posts/${id}/reshare`, { method: 'POST', body: JSON.stringify({ comment }) });
}

export function pinPost(id: string, pinned: boolean): Promise<unknown> {
    return fetchApi(`/api/feed/posts/${id}/pin`, { method: pinned ? 'POST' : 'DELETE' });
}

export function countView(id: string): Promise<{ success: boolean; views: number }> {
    return fetchApi(`/api/feed/posts/${id}/view`, { method: 'POST' });
}

export function getComments(postId: string, page: number): Promise<FeedCommentsPage> {
    return fetchApi(`/api/feed/posts/${postId}/comments?page=${page}&limit=20`);
}

export function addComment(postId: string, content: string, parentComment?: string | null): Promise<{ success: boolean; data: FeedComment }> {
    return fetchApi(`/api/feed/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, ...(parentComment ? { parentComment } : {}) }),
    });
}

export function deleteComment(id: string): Promise<unknown> {
    return fetchApi(`/api/feed/comments/${id}`, { method: 'DELETE' });
}

export function followUser(username: string, follow: boolean): Promise<unknown> {
    return fetchApi(`/api/users/${encodeURIComponent(username)}/follow`, { method: follow ? 'POST' : 'DELETE' });
}
