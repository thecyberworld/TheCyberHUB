'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import FeedItem from '@/components/feed/FeedItem';
import ReshareDialog from '@/components/feed/ReshareDialog';
import { useAuth } from '@/context/AuthContext';
import { useThread } from '@/hooks/queries';
import { countView } from '@/lib/api/feed';
import type { FeedPost } from '@/types/feed';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const { user } = useAuth();
    const { data, isLoading, isError, error, refetch } = useThread(id);
    const [reshareTarget, setReshareTarget] = useState<FeedPost | null>(null);

    // A view counts once someone has the post open, never for a card scrolled past
    const rootId = data?.root._id;
    const isOwner = data?.root.viewer.isOwner;
    useEffect(() => {
        if (!rootId || !user || isOwner) return;
        const timer = setTimeout(() => { countView(rootId).catch(() => { }); }, 2000);
        return () => clearTimeout(timer);
    }, [rootId, user, isOwner]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20" role="status" aria-label="Loading the post">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    if (isError || !data) {
        const missing = !isError || /not found/i.test(error?.message ?? '');
        return (
            <div className="text-center py-20 px-4">
                <p className="text-gray-500 mb-4">
                    {missing ? 'This post was not found. It may have been deleted, or you may not be able to see it.' : 'The post could not be loaded.'}
                </p>
                <div className="flex justify-center gap-2">
                    {!missing && (
                        <button onClick={() => refetch()} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
                            Try again
                        </button>
                    )}
                    <button onClick={() => router.push('/feed')} className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">
                        Back to feed
                    </button>
                </div>
            </div>
        );
    }

    const posts = [data.root, ...data.descendants];
    const isThread = posts.length > 1;

    return (
        <div className="max-w-3xl mx-auto py-6 px-4 pt-24">
            <div className="flex items-center gap-4 mb-6 sticky top-16 bg-black/80 backdrop-blur-md z-10 py-3 border-b border-white/10">
                <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Go back">
                    <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-white">{isThread ? 'Thread' : 'Post'}</h1>
                    {isThread && (
                        <p className="text-xs text-gray-500">
                            {posts.length} posts • Started by {data.root.author?.name ?? 'a former member'}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {posts.map((post, i) => (
                    <FeedItem
                        key={post._id}
                        post={post}
                        defaultShowComments={post._id === id || (i === 0 && !isThread)}
                        onReshare={setReshareTarget}
                        onDeleted={() => { if (post._id === data.root._id) router.push('/feed'); }}
                    />
                ))}
            </div>

            {isThread && (
                <div className="flex items-center gap-3 mt-6 justify-center">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> End of thread</span>
                    <div className="h-px bg-white/10 flex-1" />
                </div>
            )}

            <ReshareDialog post={reshareTarget} onClose={() => setReshareTarget(null)} />
        </div>
    );
}
