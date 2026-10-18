'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, Repeat2, X } from 'lucide-react';
import { useReshare } from '@/hooks/queries/useFeed';
import { reshareSchema } from '@/lib/validations';
import { renderFeedText } from '@/lib/feedText';
import type { FeedPost } from '@/types/feed';
import PostAvatar from './PostAvatar';

/** Reshare with an optional comment. Resharing a reshare shares the original post. */
export default function ReshareDialog({ post, onClose }: { post: FeedPost | null; onClose: () => void }) {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const reshare = useReshare();

    // A reshare of a reshare is a reshare of the original, so show what will really be shared
    const shown = post?.originalPost ?? post;

    const close = () => {
        setComment('');
        setError('');
        onClose();
    };

    const submit = () => {
        if (!post || reshare.isPending) return;
        const parsed = reshareSchema.safeParse({ comment: comment.trim() });
        if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? 'Check your comment.');
            return;
        }
        reshare.mutate({ post, comment: comment.trim() }, { onSuccess: close });
    };

    return (
        <Dialog.Root open={!!post} onOpenChange={(open) => !open && close()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Repeat2 className="w-4 h-4 text-orange-400" aria-hidden="true" />
                            </div>
                            <Dialog.Title className="font-semibold text-gray-900 dark:text-white">Reshare</Dialog.Title>
                        </div>
                        <Dialog.Close className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors" aria-label="Close">
                            <X className="w-4 h-4" aria-hidden="true" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className="sr-only">Share this post with your followers, with an optional comment.</Dialog.Description>

                    <textarea
                        value={comment}
                        onChange={(e) => { setComment(e.target.value); setError(''); }}
                        placeholder="Add your thoughts (optional)..."
                        aria-label="Your comment"
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-xl p-3.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 resize-none outline-none focus:border-orange-500/30 transition-colors mb-1"
                        rows={3}
                        maxLength={500}
                    />
                    <div className="flex justify-between text-[11px] mb-3">
                        <span role="alert" className="text-red-400">{error}</span>
                        <span className="text-gray-500">{comment.length}/500</span>
                    </div>

                    {shown && (
                        <div className="border border-gray-100 dark:border-white/5 rounded-xl p-4 bg-gray-50 dark:bg-white/[0.01] mb-5">
                            <div className="flex items-center gap-2 mb-2">
                                <PostAvatar name={shown.author?.name} avatar={shown.author?.avatar} size={24} />
                                <span className="text-xs text-gray-900 dark:text-gray-300 font-semibold">{shown.author?.name ?? 'Former member'}</span>
                                {shown.author && <span className="text-xs text-gray-500">@{shown.author.username}</span>}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 whitespace-pre-wrap break-words">
                                {renderFeedText((shown.content ?? '').slice(0, 240))}
                                {(shown.content?.length ?? 0) > 240 && '...'}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button onClick={close} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg font-medium">
                            Cancel
                        </button>
                        <button
                            onClick={submit}
                            disabled={reshare.isPending}
                            className="flex items-center gap-1.5 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                        >
                            {reshare.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-label="Resharing" /> : <><Repeat2 className="w-3.5 h-3.5" aria-hidden="true" />Reshare</>}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
