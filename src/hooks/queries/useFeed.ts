import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api/feed';
import { bump, mapFeedCache, removeFromFeedCache } from '@/lib/feedCache';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { CreatePostInput, FeedCommentsPage, FeedPage, FeedPost, FeedType } from '@/types/feed';

const FEED = ['feed'] as const;

type Snapshot = [readonly unknown[], unknown][];

const snapshot = (qc: QueryClient): Snapshot => qc.getQueriesData({ queryKey: FEED }) as Snapshot;
const restore = (qc: QueryClient, snap?: Snapshot) => snap?.forEach(([key, data]) => qc.setQueryData(key, data));

const patchEverywhere = (qc: QueryClient, match: (p: FeedPost) => boolean, patch: (p: FeedPost) => FeedPost) =>
    qc.setQueriesData({ queryKey: FEED }, (data: unknown) => mapFeedCache(data, match, patch));

const patchPost = (qc: QueryClient, id: string, patch: (p: FeedPost) => FeedPost) =>
    patchEverywhere(qc, (p) => p._id === id, patch);

const message = (err: unknown, fallback: string) => (err instanceof Error && err.message ? err.message : fallback);

/** The main feed, newest first, one cursor page at a time. */
export function useFeed(type: FeedType, hashtag: string | null) {
    const { user } = useAuth();
    return useInfiniteQuery<FeedPage, Error, InfiniteData<FeedPage>, unknown[], string | null>({
        queryKey: [...FEED, 'list', type, hashtag, user?.id ?? null],
        queryFn: ({ pageParam }) => api.getFeed({ type, hashtag, cursor: pageParam }),
        initialPageParam: null,
        getNextPageParam: (last) => (last.pagination.hasMore ? last.pagination.nextCursor : undefined),
        enabled: type !== 'following' || !!user,
        staleTime: 60 * 1000,
    });
}

export function useBookmarkedPosts() {
    const { user } = useAuth();
    return useInfiniteQuery<FeedPage, Error, InfiniteData<FeedPage>, unknown[], string | null>({
        queryKey: [...FEED, 'bookmarks', user?.id ?? null],
        queryFn: ({ pageParam }) => api.getBookmarks(pageParam),
        initialPageParam: null,
        getNextPageParam: (last) => (last.pagination.hasMore ? last.pagination.nextCursor : undefined),
        enabled: !!user,
        staleTime: 30 * 1000,
    });
}

export function useUserPosts(username: string | undefined) {
    const { user } = useAuth();
    return useInfiniteQuery<FeedPage, Error, InfiniteData<FeedPage>, unknown[], string | null>({
        queryKey: [...FEED, 'user', username, user?.id ?? null],
        queryFn: ({ pageParam }) => api.getUserPosts(username as string, pageParam),
        initialPageParam: null,
        getNextPageParam: (last) => (last.pagination.hasMore ? last.pagination.nextCursor : undefined),
        enabled: !!username,
        staleTime: 60 * 1000,
    });
}

/** A post and the rest of its thread (a single post is a thread of one). */
export function useThread(id: string) {
    const { user } = useAuth();
    return useQuery({
        queryKey: [...FEED, 'thread', id, user?.id ?? null],
        queryFn: () => api.getThread(id),
        enabled: !!id,
        staleTime: 30 * 1000,
        retry: (count, err) => count < 2 && !/not found/i.test(err.message),
    });
}

export function useTrendingTags() {
    return useQuery({ queryKey: [...FEED, 'tags'], queryFn: api.getTrendingTags, staleTime: 5 * 60 * 1000, retry: 1 });
}

export function useCreatePost() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: (input: CreatePostInput) => api.createPost(input),
        onSuccess: (_res, input) => {
            qc.invalidateQueries({ queryKey: [...FEED, 'list'] });
            qc.invalidateQueries({ queryKey: [...FEED, 'user'] });
            addToast({ variant: 'success', message: input.isThread ? 'Thread posted' : 'Post published' });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not post', message: message(err, 'Please try again.') }),
    });
}

export function useToggleLike() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: (post: FeedPost) => api.toggleLike(post._id),
        onMutate: async (post) => {
            await qc.cancelQueries({ queryKey: FEED });
            const snap = snapshot(qc);
            patchPost(qc, post._id, (p) => ({
                ...p,
                likeCount: Math.max(0, p.likeCount + (p.viewer.liked ? -1 : 1)),
                viewer: { ...p.viewer, liked: !p.viewer.liked },
            }));
            return { snap };
        },
        onSuccess: (res, post) =>
            patchPost(qc, post._id, (p) => ({ ...p, likeCount: res.data.likeCount, viewer: { ...p.viewer, liked: res.data.liked } })),
        onError: (err, _post, ctx) => {
            restore(qc, ctx?.snap);
            addToast({ variant: 'error', message: message(err, 'Could not update your like.') });
        },
    });
}

export function useToggleBookmark() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: (post: FeedPost) => api.toggleBookmark(post._id),
        onMutate: async (post) => {
            await qc.cancelQueries({ queryKey: FEED });
            const snap = snapshot(qc);
            patchPost(qc, post._id, (p) => ({
                ...p,
                bookmarkCount: Math.max(0, p.bookmarkCount + (p.viewer.bookmarked ? -1 : 1)),
                viewer: { ...p.viewer, bookmarked: !p.viewer.bookmarked },
            }));
            return { snap };
        },
        onSuccess: (res, post) => {
            patchPost(qc, post._id, (p) => ({ ...p, bookmarkCount: res.data.bookmarkCount, viewer: { ...p.viewer, bookmarked: res.data.bookmarked } }));
            qc.invalidateQueries({ queryKey: [...FEED, 'bookmarks'] });
        },
        onError: (err, _post, ctx) => {
            restore(qc, ctx?.snap);
            addToast({ variant: 'error', message: message(err, 'Could not update your saved posts.') });
        },
    });
}

export function useReshare() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: ({ post, comment }: { post: FeedPost; comment: string }) => api.resharePost(post._id, comment),
        onSuccess: (_res, { post }) => {
            // A reshare of a reshare counts on the original
            const targetId = post.originalPost ? post.originalPost._id : post._id;
            patchEverywhere(qc, (p) => p._id === targetId, bump('reshareCount', 1));
            qc.invalidateQueries({ queryKey: [...FEED, 'list'] });
            addToast({ variant: 'success', message: 'Reshared to your profile' });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not reshare', message: message(err, 'Please try again.') }),
    });
}

export function useDeletePost() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: (id: string) => api.deletePost(id),
        onSuccess: (_res, id) => {
            qc.setQueriesData({ queryKey: FEED }, (data: unknown) => removeFromFeedCache(data, id));
            addToast({ variant: 'success', message: 'Post deleted' });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not delete', message: message(err, 'Please try again.') }),
    });
}

export function usePinPost() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: ({ id, pinned }: { id: string; pinned: boolean }) => api.pinPost(id, pinned),
        onSuccess: (_res, { pinned }) => {
            qc.invalidateQueries({ queryKey: [...FEED, 'list'] });
            addToast({ variant: 'success', message: pinned ? 'Pinned to the top of the feed' : 'Unpinned' });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not pin', message: message(err, 'Please try again.') }),
    });
}

/** Follow or unfollow an author from a card; every card by that author updates at once. */
export function useFollowAuthor() {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: ({ username, follow }: { authorId: string; username: string; follow: boolean }) =>
            api.followUser(username, follow),
        onMutate: async ({ authorId, follow }) => {
            await qc.cancelQueries({ queryKey: FEED });
            const snap = snapshot(qc);
            patchEverywhere(qc, (p) => p.author?._id === authorId, (p) => ({ ...p, viewer: { ...p.viewer, followingAuthor: follow } }));
            return { snap };
        },
        onSuccess: (_res, { follow }) => {
            // The following tab changes with who you follow
            qc.invalidateQueries({ queryKey: [...FEED, 'list', 'following'] });
            addToast({ variant: 'success', message: follow ? 'You are following them' : 'Unfollowed' });
        },
        onError: (err, _vars, ctx) => {
            restore(qc, ctx?.snap);
            addToast({ variant: 'error', message: message(err, 'Could not update the follow.') });
        },
    });
}

export function useComments(postId: string, enabled = true) {
    return useInfiniteQuery<FeedCommentsPage, Error, InfiniteData<FeedCommentsPage>, unknown[], number>({
        queryKey: [...FEED, 'comments', postId],
        queryFn: ({ pageParam }) => api.getComments(postId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (last) => (last.pagination.page < last.pagination.totalPages ? last.pagination.page + 1 : undefined),
        enabled: enabled && !!postId,
        staleTime: 30 * 1000,
    });
}

export function useAddComment(postId: string) {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: ({ content, parentComment }: { content: string; parentComment?: string | null }) =>
            api.addComment(postId, content, parentComment),
        onSuccess: () => {
            patchPost(qc, postId, bump('commentCount', 1));
            qc.invalidateQueries({ queryKey: [...FEED, 'comments', postId] });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not comment', message: message(err, 'Please try again.') }),
    });
}

export function useDeleteComment(postId: string) {
    const qc = useQueryClient();
    const { addToast } = useToast();
    return useMutation({
        // `removed` is the comment plus its replies, which the server deletes with it
        mutationFn: ({ id }: { id: string; removed: number }) => api.deleteComment(id),
        onSuccess: (_res, { removed }) => {
            patchPost(qc, postId, bump('commentCount', -removed));
            qc.invalidateQueries({ queryKey: [...FEED, 'comments', postId] });
        },
        onError: (err) => addToast({ variant: 'error', title: 'Could not delete', message: message(err, 'Please try again.') }),
    });
}
