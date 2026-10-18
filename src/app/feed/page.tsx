'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Rss, Loader2, X, Search, TrendingUp, Hash, Flame, MousePointerClick, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useDebounce } from '@/hooks/useDebounce';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import FeedItem from '@/components/feed/FeedItem';
import CreatePost from '@/components/feed/CreatePost';
import ReshareDialog from '@/components/feed/ReshareDialog';
import { useBookmarkedPosts, useFeed, usePublicStats, useTrendingTags } from '@/hooks/queries';
import type { FeedPost, FeedType } from '@/types/feed';

type Tab = FeedType | 'bookmarks';

const TABS: { value: Tab; label: string; needsLogin?: boolean }[] = [
    { value: 'all', label: 'All' },
    { value: 'post', label: 'Posts' },
    { value: 'event', label: 'Activity' },
    { value: 'following', label: 'Following', needsLogin: true },
    { value: 'trending', label: 'Trending' },
    { value: 'bookmarks', label: 'Saved', needsLogin: true },
];

function matchesSearch(post: FeedPost, term: string) {
    const t = term.toLowerCase();
    return (
        post.content?.toLowerCase().includes(t) ||
        post.eventData?.description?.toLowerCase().includes(t) ||
        post.author?.name.toLowerCase().includes(t) ||
        post.author?.username.toLowerCase().includes(t) ||
        post.hashtags?.some((h) => h.includes(t.replace(/^#/, ''))) ||
        false
    );
}

function emptyCopy(tab: Tab, hasSearch: boolean) {
    if (hasSearch) return { title: 'No matching posts', description: 'Try a different search term.' };
    switch (tab) {
        case 'following':
            return { title: 'Nothing from people you follow yet', description: 'Follow members from their posts or the leaderboard and their posts show up here.' };
        case 'bookmarks':
            return { title: 'No saved posts', description: 'Use Save on a post to keep it here.' };
        case 'trending':
            return { title: 'Nothing is trending yet', description: 'Posts with likes, comments and reshares this week show up here.' };
        case 'event':
            return { title: 'No activity yet', description: 'Solve a challenge or earn a badge and it shows up here.' };
        default:
            return { title: 'No posts yet', description: 'Share your first win or insight with the community!' };
    }
}

export default function FeedPage() {
    const { user } = useAuth();
    const [tab, setTab] = useState<Tab>('all');
    const [hashtag, setHashtag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [reshareTarget, setReshareTarget] = useState<FeedPost | null>(null);

    const feedType: FeedType = tab === 'bookmarks' ? 'all' : tab;
    const feed = useFeed(feedType, hashtag);
    const saved = useBookmarkedPosts();
    const active = tab === 'bookmarks' ? saved : feed;
    const tags = useTrendingTags();
    const stats = usePublicStats();

    const posts = useMemo(() => active.data?.pages.flatMap((p) => p.data) ?? [], [active.data]);
    const visible = debouncedSearch.trim() ? posts.filter((p) => matchesSearch(p, debouncedSearch.trim())) : posts;

    // A signed-out visitor cannot be on a tab that needs an account
    useEffect(() => {
        if (!user && (tab === 'following' || tab === 'bookmarks')) setTab('all');
    }, [user, tab]);

    const { hasNextPage, isFetchingNextPage, fetchNextPage } = active;
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
            },
            { rootMargin: '400px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, visible.length]);

    const handleHashtagClick = useCallback((tag: string) => {
        setHashtag(tag.replace(/^#/, '').toLowerCase());
        if (tab === 'bookmarks') setTab('all');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [tab]);

    const tabs = TABS.filter((t) => !t.needsLogin || user);
    const copy = emptyCopy(tab, !!debouncedSearch.trim());
    const trendingTags = tags.data ?? [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
            <div className="fixed top-0 left-1/3 w-96 h-72 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed top-40 right-1/4 w-80 h-56 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-orange-500 dark:text-orange-400/60 mb-1">
                            <Rss className="w-4 h-4" aria-hidden="true" />
                            <span className="tracking-wide uppercase text-xs font-medium">Community Feed</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Feed</h1>
                        <p className="text-gray-600 dark:text-gray-500 text-sm">Wins, writeups, and insights from the community.</p>
                    </div>

                    {/* Trending tags on small screens */}
                    {trendingTags.length > 0 && (
                        <div className="lg:hidden mb-6 overflow-x-auto scrollbar-none">
                            <div className="flex items-center gap-2 pb-2 min-w-max">
                                <TrendingUp className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                                <span className="text-xs font-semibold text-gray-400 shrink-0">Trending:</span>
                                {trendingTags.slice(0, 8).map((t) => (
                                    <button
                                        key={t.tag}
                                        onClick={() => setHashtag(t.tag)}
                                        aria-pressed={hashtag === t.tag}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${hashtag === t.tag
                                            ? 'bg-orange-500/20 text-orange-400'
                                            : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                            }`}
                                    >
                                        #{t.tag}
                                        <span className="ml-1 text-gray-600">{t.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-screen-xl mx-auto">
                        <div className="w-full lg:w-[600px] shrink-0 flex-1 min-w-0">
                            {user && (
                                <div className="mb-5">
                                    <CreatePost />
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-5 flex-wrap">
                                {hashtag && (
                                    <button
                                        onClick={() => setHashtag(null)}
                                        aria-label={`Clear the #${hashtag} filter`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 dark:text-orange-400 rounded-lg text-xs font-medium"
                                    >
                                        <Hash className="w-3 h-3" aria-hidden="true" />
                                        {hashtag}
                                        <X className="w-3 h-3 ml-1 opacity-60" aria-hidden="true" />
                                    </button>
                                )}
                                <div role="tablist" aria-label="Feed filter" className="flex items-center gap-0.5 ml-auto bg-gray-950 border border-white/5 rounded-lg p-0.5 overflow-x-auto max-w-full">
                                    {tabs.map((t) => (
                                        <button
                                            key={t.value}
                                            role="tab"
                                            aria-selected={tab === t.value}
                                            onClick={() => setTab(t.value)}
                                            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${tab === t.value
                                                ? 'bg-white dark:bg-orange-500 text-gray-900 border border-gray-200 dark:border-none dark:text-white shadow-sm dark:shadow-orange-500/25'
                                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {active.isLoading ? (
                                <div className="space-y-4" role="status" aria-label="Loading the feed">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="w-10 h-10 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-3/4 mb-4" />
                                            <div className="flex gap-4">
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : active.isError ? (
                                <div role="alert" className="text-center py-16">
                                    <p className="text-sm text-gray-400 mb-3">The feed could not be loaded.</p>
                                    <button onClick={() => active.refetch()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                                        Try again
                                    </button>
                                </div>
                            ) : visible.length === 0 ? (
                                <EmptyState icon={tab === 'following' ? Users : Rss} title={copy.title} description={copy.description} />
                            ) : (
                                <div className="space-y-4">
                                    {visible.map((post) => (
                                        <FeedItem key={post._id} post={post} onReshare={setReshareTarget} onHashtagClick={handleHashtagClick} />
                                    ))}
                                </div>
                            )}

                            {hasNextPage && !active.isLoading && (
                                <div ref={sentinelRef} className="flex items-center justify-center py-8">
                                    {isFetchingNextPage ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-gray-600" aria-label="Loading more" />
                                    ) : (
                                        <button onClick={() => fetchNextPage()} className="text-xs text-orange-400 hover:underline">Load more</button>
                                    )}
                                </div>
                            )}
                        </div>

                        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-28 self-start space-y-6" aria-label="Feed sidebar">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" aria-hidden="true" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter loaded posts..."
                                    aria-label="Filter loaded posts"
                                    className="w-full bg-gray-950 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/30 transition-colors"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white" aria-label="Clear search">
                                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                                    </button>
                                )}
                            </div>

                            <div className="bg-black border border-white/5 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 pt-4 pb-3">
                                    <TrendingUp className="w-4 h-4 text-orange-500" aria-hidden="true" />
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Trending</h2>
                                </div>
                                {tags.isLoading ? (
                                    <div className="px-4 pb-4"><Loader2 className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-600 mx-auto" aria-label="Loading trending tags" /></div>
                                ) : trendingTags.length === 0 ? (
                                    <div className="px-4 pb-5 text-center">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-2">
                                            <MousePointerClick className="w-4 h-4 text-gray-400 dark:text-gray-600" aria-hidden="true" />
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">No trending tags yet</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">Use #hashtags in your posts!</p>
                                    </div>
                                ) : (
                                    <div className="pb-2">
                                        {trendingTags.slice(0, 8).map((t, i) => (
                                            <button
                                                key={t.tag}
                                                onClick={() => setHashtag(t.tag)}
                                                aria-pressed={hashtag === t.tag}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition-colors group ${hashtag === t.tag ? 'bg-orange-500/5' : ''}`}
                                            >
                                                <span className="text-[10px] text-gray-700 font-mono w-4 text-right">{i + 1}</span>
                                                <div className="flex-1 text-left">
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">#{t.tag}</span>
                                                    <p className="text-[10px] text-gray-600 mt-0.5">{t.count} {t.count === 1 ? 'post' : 'posts'}</p>
                                                </div>
                                                {i < 3 && <Flame className="w-3 h-3 text-orange-500/40" aria-hidden="true" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {stats.data && (
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-white">{stats.data.members.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-600 uppercase tracking-wider">Members</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-white">{stats.data.challengesSolved.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-600 uppercase tracking-wider">Challenges solved</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!user && (
                                <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4 text-center">
                                    <p className="text-sm text-gray-300 mb-3">Join the conversation: post, follow and save.</p>
                                    <Link href="/auth" className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors">
                                        Log in or sign up
                                    </Link>
                                </div>
                            )}

                            <p className="text-[10px] text-gray-700 text-center px-4">
                                Use <span className="text-gray-500">**bold**</span> · <span className="text-gray-500">`code`</span> · <span className="text-gray-500">#tags</span> · <span className="text-gray-500">@people</span>
                            </p>
                        </aside>
                    </div>
                </div>
            </div>

            <ReshareDialog post={reshareTarget} onClose={() => setReshareTarget(null)} />
        </div>
    );
}
