export type FeedType = 'all' | 'post' | 'event' | 'following' | 'trending';

export interface FeedAuthor {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
}

/** What a post means for the person looking at it (all false when signed out). */
export interface FeedViewerState {
    liked: boolean;
    bookmarked: boolean;
    isOwner: boolean;
    followingAuthor: boolean;
    canModerate: boolean;
}

export interface FeedEventData {
    title?: string;
    description?: string;
    targetId?: string;
    targetType?: string;
    targetSlug?: string;
    value?: number;
    icon?: string;
    color?: string;
}

export interface FeedPost {
    _id: string;
    type: 'post' | 'event';
    author: FeedAuthor | null;
    content?: string;
    images?: string[];
    eventType?: string;
    eventData?: FeedEventData;
    likeCount: number;
    commentCount: number;
    bookmarkCount: number;
    reshareCount: number;
    views?: number;
    hashtags?: string[];
    visibility?: 'public' | 'followers';
    isPinned?: boolean;
    isThreadRoot?: boolean;
    threadId?: string | null;
    /** Posts after the first in a thread (only on a thread's first post) */
    threadCount?: number;
    originalPost?: FeedPost | null;
    originalUnavailable?: boolean;
    reshareComment?: string;
    createdAt: string;
    viewer: FeedViewerState;
}

export interface FeedPagination {
    hasMore: boolean;
    nextCursor: string | null;
    count: number;
}

export interface FeedPage {
    success: boolean;
    data: FeedPost[];
    pagination: FeedPagination;
}

export interface FeedThread {
    success: boolean;
    root: FeedPost;
    descendants: FeedPost[];
}

export interface FeedComment {
    _id: string;
    author: FeedAuthor | null;
    content: string;
    createdAt: string;
    parentComment?: string | null;
    replies: FeedComment[];
    viewer: { isOwner: boolean; canModerate: boolean };
}

export interface FeedCommentsPage {
    success: boolean;
    data: FeedComment[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface TrendingTag {
    tag: string;
    count: number;
}

export interface CreatePostInput {
    /** One string for a post, a list of 2 to 10 for a thread */
    content: string | string[];
    /** One list for a post, a list of lists (one per post) for a thread */
    images?: string[] | string[][];
    isThread?: boolean;
    visibility?: 'public' | 'followers';
}
