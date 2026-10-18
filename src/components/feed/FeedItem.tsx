'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MessageCircle, MoreHorizontal, Trash2, Pin, PinOff, Lock, Trophy, Flame, PenLine, MessageSquare, Calendar,
    UserPlus, UserCheck, Brain, Zap, Heart, Repeat2, Bookmark, Eye, ChevronDown, ChevronUp, Link2, Layers, ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
    useDeletePost, useFollowAuthor, usePinPost, useToggleBookmark, useToggleLike,
} from '@/hooks/queries/useFeed';
import { ReportContentButton } from '@/components/ui/ReportContentButton';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { eventHref, timeAgo } from '@/lib/feedFormat';
import { renderFeedText } from '@/lib/feedText';
import type { FeedPost } from '@/types/feed';
import FeedComments from './FeedComments';
import PostAvatar from './PostAvatar';

const eventIcons: Record<string, React.ElementType> = {
    challenge_solved: Trophy,
    badge_earned: Trophy,
    streak_milestone: Flame,
    blog_published: PenLine,
    forum_post: MessageSquare,
    event_joined: Calendar,
    user_joined: UserPlus,
    daily_challenge_completed: Brain,
};

const PIN_ROLES = ['moderator', 'admin', 'owner'];
const LONG_POST = 400;

interface FeedItemProps {
    post: FeedPost;
    onReshare?: (post: FeedPost) => void;
    onHashtagClick?: (tag: string) => void;
    /** Open the comments straight away (the post page) */
    defaultShowComments?: boolean;
    /** Called after the post was deleted from its own page */
    onDeleted?: () => void;
}

export default function FeedItem({ post, onReshare, onHashtagClick, defaultShowComments = false, onDeleted }: FeedItemProps) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const like = useToggleLike();
    const bookmark = useToggleBookmark();
    const follow = useFollowAuthor();
    const remove = useDeletePost();
    const pin = usePinPost();

    const [expanded, setExpanded] = useState(false);
    const [showComments, setShowComments] = useState(defaultShowComments);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { viewer } = post;
    const author = post.author;
    const profileHref = author ? `/user/${author.username}` : null;
    const canDelete = viewer.isOwner || viewer.canModerate;
    const canPin = !!user && PIN_ROLES.includes(user.role) && post.visibility !== 'followers' && post.type === 'post';
    const isLong = (post.content?.length ?? 0) > LONG_POST;

    const needLogin = (what: string) => {
        addToast({ variant: 'info', message: `Log in to ${what}.` });
    };

    const handleLike = () => (user ? like.mutate(post) : needLogin('like posts'));
    const handleBookmark = () => (user ? bookmark.mutate(post) : needLogin('save posts'));
    const handleReshare = () => (user ? onReshare?.(post) : needLogin('reshare posts'));
    const handleFollow = () => {
        if (!author) return;
        if (!user) return needLogin('follow people');
        follow.mutate({ authorId: author._id, username: author.username, follow: !viewer.followingAuthor });
    };
    const handleDelete = () => {
        setConfirmDelete(false);
        remove.mutate(post._id, { onSuccess: () => onDeleted?.() });
    };
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/feed/post/${post._id}`);
            addToast({ variant: 'success', message: 'Link copied' });
        } catch {
            addToast({ variant: 'error', message: 'Could not copy the link.' });
        }
    };

    // ----- Activity (system event) card -----
    if (post.type === 'event' && post.eventType && post.eventData) {
        const Icon = eventIcons[post.eventType] || Zap;
        const color = post.eventData.color || '#f97316';
        const href = post.eventType === 'user_joined' ? profileHref : eventHref(post);

        const body = (
            <>
                <p className="text-sm text-gray-700 dark:text-gray-300">{post.eventData.description}</p>
                {post.eventData.value != null && post.eventData.value > 0 && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                        <Zap className="w-3 h-3 text-orange-500 dark:text-orange-400" aria-hidden="true" />
                        +{post.eventData.value} {post.eventType === 'streak_milestone' ? 'days' : 'XP'}
                    </span>
                )}
            </>
        );

        return (
            <article className="bg-black border border-white/10 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}26` }}>
                        <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {profileHref && author ? (
                                <Link href={profileHref} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                                    {author.name}
                                </Link>
                            ) : (
                                <span className="text-sm font-semibold text-gray-500">Former member</span>
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-600">• {timeAgo(post.createdAt)}</span>
                        </div>
                        {href ? (
                            <Link href={href} className="group block rounded-lg -mx-2 px-2 py-1 hover:bg-white/[0.03] transition-colors">
                                {body}
                                <span className="inline-flex items-center gap-0.5 mt-1 text-xs text-orange-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                                    View <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                </span>
                            </Link>
                        ) : (
                            body
                        )}
                    </div>
                    {canDelete && (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors"
                            aria-label="Remove this activity"
                        >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                    )}
                </div>
                <ConfirmDialog
                    open={confirmDelete}
                    onConfirm={handleDelete}
                    onCancel={() => setConfirmDelete(false)}
                    title="Remove this activity?"
                    description="It disappears from the feed."
                    confirmText="Remove"
                />
            </article>
        );
    }

    // ----- Reshared post (the card inside) -----
    const original = post.originalPost;
    const renderOriginal = () => {
        if (!post.originalPost && !post.originalUnavailable) return null;
        if (!original) {
            return (
                <div className="mt-3 border border-dashed border-white/10 rounded-xl p-4 text-sm text-gray-500">
                    This post is no longer available.
                </div>
            );
        }
        return (
            <Link
                href={`/feed/post/${original._id}`}
                className="block mt-3 bg-gray-950 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-colors"
            >
                <div className="flex items-center gap-2 mb-2">
                    <PostAvatar name={original.author?.name} avatar={original.author?.avatar} size={24} />
                    <span className="text-xs text-gray-300">{original.author?.name ?? 'Former member'}</span>
                    <span className="text-xs text-gray-600">• {timeAgo(original.createdAt)}</span>
                </div>
                {original.content && (
                    <p className="text-sm text-gray-300 line-clamp-4 whitespace-pre-wrap break-words">
                        {renderFeedText(original.content)}
                    </p>
                )}
                {original.images && original.images.length > 0 && (
                    <p className="mt-2 text-xs text-gray-500">{original.images.length} image{original.images.length === 1 ? '' : 's'}</p>
                )}
            </Link>
        );
    };

    const threadMore = post.isThreadRoot ? post.threadCount ?? 0 : 0;

    return (
        <article className="bg-black border border-white/10 rounded-2xl p-5 shadow-sm" aria-label={`Post by ${author?.name ?? 'a former member'}`}>
            {post.isPinned && (
                <div className="flex items-center gap-1.5 mb-3 text-xs text-orange-400 font-medium">
                    <Pin className="w-3.5 h-3.5" aria-hidden="true" /> Pinned
                </div>
            )}
            {post.originalPost !== undefined && (
                <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
                    <Repeat2 className="w-3.5 h-3.5" aria-hidden="true" />
                    {profileHref && author ? (
                        <Link href={profileHref} className="hover:text-gray-900 dark:hover:text-white">{author.name}</Link>
                    ) : (
                        <span>A former member</span>
                    )}
                    <span>reshared</span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                    <PostAvatar name={author?.name} avatar={author?.avatar} />
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            {profileHref && author ? (
                                <Link href={profileHref} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors truncate">
                                    {author.name}
                                </Link>
                            ) : (
                                <span className="text-sm font-semibold text-gray-500">Former member</span>
                            )}
                            {!viewer.isOwner && author && (
                                <button
                                    onClick={handleFollow}
                                    disabled={follow.isPending}
                                    aria-pressed={viewer.followingAuthor}
                                    className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all disabled:opacity-60 ${viewer.followingAuthor
                                        ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20'
                                        : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                        }`}
                                >
                                    {viewer.followingAuthor ? <UserCheck className="w-3 h-3" aria-hidden="true" /> : <UserPlus className="w-3 h-3" aria-hidden="true" />}
                                    {viewer.followingAuthor ? 'Following' : 'Follow'}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            {author && <>@{author.username} • </>}
                            <Link href={`/feed/post/${post._id}`} className="hover:underline">{timeAgo(post.createdAt)}</Link>
                            {post.visibility === 'followers' && (
                                <span className="inline-flex items-center gap-0.5 ml-1" title="Only followers can see this">
                                    <Lock className="w-3 h-3" aria-hidden="true" /> Followers
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Post options">
                            <MoreHorizontal className="w-4 h-4 text-gray-500" aria-hidden="true" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[160px]">
                        <DropdownMenuItem onSelect={copyLink}>
                            <Link2 className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> Copy link
                        </DropdownMenuItem>
                        {canPin && (
                            <DropdownMenuItem onSelect={() => pin.mutate({ id: post._id, pinned: !post.isPinned })}>
                                {post.isPinned ? <PinOff className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> : <Pin className="w-3.5 h-3.5 mr-2" aria-hidden="true" />}
                                {post.isPinned ? 'Unpin' : 'Pin to top'}
                            </DropdownMenuItem>
                        )}
                        {canDelete && (
                            <DropdownMenuItem onSelect={() => setConfirmDelete(true)} className="text-red-500 focus:text-red-500">
                                <Trash2 className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {post.reshareComment && (
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap break-words">
                    {renderFeedText(post.reshareComment, { onHashtagClick })}
                </p>
            )}

            {post.content && (
                <div className="mb-3">
                    <div className={`text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap break-words ${isLong && !expanded ? 'line-clamp-6' : ''}`}>
                        {renderFeedText(post.content, { onHashtagClick })}
                    </div>
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                            className="flex items-center gap-1 mt-2 text-xs text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            {expanded ? <><ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> Show less</> : <><ChevronDown className="w-3.5 h-3.5" aria-hidden="true" /> Read more</>}
                        </button>
                    )}
                </div>
            )}

            {renderOriginal()}

            {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.map((img, i) => (
                        <Image key={img + i} src={img} alt={`Image ${i + 1} of ${post.images?.length}`} width={600} height={192} className="rounded-xl w-full h-48 object-cover" unoptimized />
                    ))}
                </div>
            )}

            {threadMore > 0 && (
                <Link
                    href={`/feed/post/${post._id}`}
                    className="flex items-center gap-1.5 mb-3 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors w-fit"
                >
                    <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                    Show thread ({threadMore} more {threadMore === 1 ? 'post' : 'posts'})
                </Link>
            )}

            {((post.likeCount ?? 0) > 0 || (post.views ?? 0) > 0) && (
                <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-100 dark:border-white/5">
                    {post.likeCount > 0 && (
                        <div className="flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" aria-hidden="true" />
                            <span className="text-xs text-gray-500">{post.likeCount}</span>
                        </div>
                    )}
                    {(post.views ?? 0) > 0 && (
                        <div className="flex items-center gap-1.5" title={`${post.views} views`}>
                            <Eye className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                            <span className="text-xs text-gray-500">{post.views}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-1 pt-1 flex-wrap">
                <button
                    onClick={handleLike}
                    aria-pressed={viewer.liked}
                    aria-label={viewer.liked ? 'Unlike' : 'Like'}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${viewer.liked
                        ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${viewer.liked ? 'fill-current' : ''}`} aria-hidden="true" />
                    Like
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    aria-expanded={showComments}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${showComments
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {post.commentCount > 0 && post.commentCount}
                    <span className="hidden sm:inline">Comment</span>
                </button>

                {post.visibility !== 'followers' && (
                    <button
                        onClick={handleReshare}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                    >
                        <Repeat2 className="w-4 h-4" aria-hidden="true" />
                        {post.reshareCount > 0 ? post.reshareCount : null}
                        <span className="hidden sm:inline">Reshare</span>
                    </button>
                )}

                <div className="ml-auto flex items-center gap-1">
                    {!viewer.isOwner && (
                        <ReportContentButton contentType="feedPost" contentId={post._id} authorId={author?._id} className="p-1.5" />
                    )}
                    <button
                        onClick={handleBookmark}
                        aria-pressed={viewer.bookmarked}
                        aria-label={viewer.bookmarked ? 'Remove from saved' : 'Save'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${viewer.bookmarked
                            ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <Bookmark className={`w-4 h-4 ${viewer.bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
                        <span className="hidden sm:inline">Save</span>
                    </button>
                </div>
            </div>

            {showComments && <FeedComments post={post} />}

            <ConfirmDialog
                open={confirmDelete}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                title={post.isThreadRoot && threadMore > 0 ? 'Delete this thread?' : 'Delete this post?'}
                description={
                    post.isThreadRoot && threadMore > 0
                        ? 'The whole thread is deleted. This cannot be undone.'
                        : 'This cannot be undone.'
                }
                confirmText="Delete"
            />
        </article>
    );
}

