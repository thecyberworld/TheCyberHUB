'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Send, Loader2, CornerDownRight, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useAddComment, useComments, useDeleteComment } from '@/hooks/queries/useFeed';
import { feedCommentSchema } from '@/lib/validations';
import { timeAgo } from '@/lib/feedFormat';
import { renderFeedText } from '@/lib/feedText';
import type { FeedComment, FeedPost } from '@/types/feed';
import PostAvatar from './PostAvatar';

interface ReplyTarget {
    id: string;
    username: string;
}

function CommentBubble({
    comment,
    isReply,
    onReply,
    onDelete,
}: {
    comment: FeedComment;
    isReply?: boolean;
    onReply: (target: ReplyTarget) => void;
    onDelete: (comment: FeedComment) => void;
}) {
    const { user } = useAuth();
    const author = comment.author;
    const canDelete = comment.viewer.isOwner || comment.viewer.canModerate;

    return (
        <div id={`comment-${comment._id}`} className={`flex gap-2.5 group relative scroll-mt-24 ${isReply ? 'ml-8 sm:ml-12 mt-3' : ''}`}>
            {isReply && <div className="absolute -left-5 top-3 w-4 h-4 border-l-2 border-b-2 border-gray-200 dark:border-white/10 rounded-bl-lg pointer-events-none" />}
            <PostAvatar name={author?.name} avatar={author?.avatar} size={28} />
            <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2 mb-0.5">
                        {author ? (
                            <Link href={`/user/${author.username}`} className="text-xs font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                                {author.name}
                            </Link>
                        ) : (
                            <span className="text-xs font-semibold text-gray-500">Former member</span>
                        )}
                        <span className="text-[10px] text-gray-500 dark:text-gray-600">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                        {renderFeedText(comment.content)}
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-1.5 ml-1">
                    {user && author && (
                        <button
                            onClick={() => onReply({ id: comment._id, username: author.username })}
                            className="flex items-center gap-1 text-[11px] text-gray-500 font-medium hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                            <CornerDownRight className="w-3 h-3" aria-hidden="true" />
                            Reply
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(comment)}
                            className="text-[11px] text-gray-500 font-medium hover:text-red-500 dark:hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function FeedComments({ post }: { post: FeedPost }) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const comments = useComments(post._id);
    const add = useAddComment(post._id);
    const remove = useDeleteComment(post._id);
    const [text, setText] = useState('');
    const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const pages = comments.data?.pages ?? [];
    const list = pages.flatMap((p) => p.data);
    const total = pages[0]?.pagination.total ?? 0;

    const startReply = (target: ReplyTarget) => {
        setReplyTo(target);
        setText(`@${target.username} `);
        inputRef.current?.focus();
    };

    const submit = () => {
        const content = text.trim();
        if (!content || add.isPending || !user) return;
        const parsed = feedCommentSchema.safeParse({ content });
        if (!parsed.success) {
            addToast({ variant: 'error', message: parsed.error.issues[0]?.message ?? 'Check your comment.' });
            return;
        }
        add.mutate(
            { content, parentComment: replyTo?.id ?? null },
            {
                onSuccess: () => {
                    setText('');
                    setReplyTo(null);
                },
            }
        );
    };

    const deleteComment = (comment: FeedComment) =>
        remove.mutate({ id: comment._id, removed: 1 + (comment.replies?.length ?? 0) });

    return (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
            {comments.isLoading ? (
                <div className="flex justify-center py-3" role="status" aria-label="Loading comments">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
            ) : comments.isError ? (
                <div role="alert" className="text-xs text-gray-500 py-2">
                    Comments could not be loaded.{' '}
                    <button onClick={() => comments.refetch()} className="text-orange-400 hover:underline">Try again</button>
                </div>
            ) : list.length > 0 ? (
                <div className="space-y-4 mb-3">
                    {list.map((comment) => (
                        <div key={comment._id} className="space-y-3">
                            <CommentBubble comment={comment} onReply={startReply} onDelete={deleteComment} />
                            {comment.replies.map((reply) => (
                                <CommentBubble key={reply._id} comment={reply} isReply onReply={startReply} onDelete={deleteComment} />
                            ))}
                        </div>
                    ))}
                    {comments.hasNextPage && (
                        <button
                            onClick={() => comments.fetchNextPage()}
                            disabled={comments.isFetchingNextPage}
                            className="text-xs text-orange-400 hover:underline disabled:opacity-60"
                        >
                            {comments.isFetchingNextPage ? 'Loading…' : `Show more comments (${total - list.length} left)`}
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-xs text-gray-500 mb-3">{user ? 'No comments yet. Start the conversation.' : 'No comments yet.'}</p>
            )}

            {user ? (
                <div>
                    {replyTo && (
                        <div className="flex items-center gap-2 mb-1.5 text-[11px] text-gray-500">
                            Replying to <span className="text-orange-400">@{replyTo.username}</span>
                            <button
                                onClick={() => { setReplyTo(null); setText(''); }}
                                className="p-0.5 rounded hover:bg-white/5"
                                aria-label="Cancel reply"
                            >
                                <X className="w-3 h-3" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                    <div className="flex gap-2 items-start">
                        <PostAvatar name={user.name} avatar={user.avatar} size={28} />
                        <div className="flex-1 flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && submit()}
                                placeholder="Write a comment..."
                                aria-label="Write a comment"
                                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500/30 transition-colors"
                                maxLength={500}
                            />
                            <button
                                onClick={submit}
                                disabled={!text.trim() || add.isPending}
                                className={`p-2 rounded-xl transition-all border ${text.trim()
                                    ? 'bg-orange-500 hover:bg-orange-600 border-orange-500 text-white shadow-sm'
                                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-500 cursor-not-allowed'
                                    }`}
                                aria-label="Submit comment"
                            >
                                {add.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <Send className="w-3.5 h-3.5" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-gray-500">
                    <Link href="/auth" className="text-orange-400 hover:underline">Log in</Link> to join the conversation.
                </p>
            )}
        </div>
    );
}
