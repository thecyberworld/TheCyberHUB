"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, UserCheck, UserPlus, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useFollowSuggestions } from '@/hooks/queries';
import { followUser } from '@/lib/api/feed';
import PostAvatar from '@/components/feed/PostAvatar';

interface Props {
    limit?: number;
    /** Heading above the list; leave out when the caller has its own */
    title?: string;
    /** Called after each successful follow, with how many people were followed from this list so far */
    onFollowed?: (count: number) => void;
    className?: string;
}

export default function SuggestedFollows({ limit = 5, title, onFollowed, className = '' }: Props) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const qc = useQueryClient();
    const { data, isLoading, isError, refetch } = useFollowSuggestions(limit, !!user);
    const [following, setFollowing] = useState<Set<string>>(new Set());
    const [pending, setPending] = useState<Set<string>>(new Set());

    if (!user) return null;

    const toggle = async (username: string) => {
        if (pending.has(username)) return;
        const follow = !following.has(username);
        const flip = (set: Set<string>, on: boolean) => {
            const next = new Set(set);
            if (on) next.add(username); else next.delete(username);
            return next;
        };
        setPending((p) => flip(p, true));
        setFollowing((f) => flip(f, follow));
        try {
            await followUser(username, follow);
            qc.invalidateQueries({ queryKey: ['onboarding', 'state'] });
            qc.invalidateQueries({ queryKey: ['feed', 'list', 'following'] });
            onFollowed?.(follow ? following.size + 1 : Math.max(0, following.size - 1));
        } catch (err) {
            setFollowing((f) => flip(f, !follow));
            addToast({ variant: 'error', message: err instanceof Error ? err.message : 'Could not update the follow.' });
        } finally {
            setPending((p) => flip(p, false));
        }
    };

    return (
        <section className={className} aria-label={title ?? 'People to follow'}>
            {title && (
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                    <Users className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    {title}
                </h2>
            )}

            {isLoading ? (
                <div className="flex justify-center py-6" role="status" aria-label="Finding people to follow">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" aria-hidden="true" />
                </div>
            ) : isError ? (
                <div role="alert" className="text-center py-4">
                    <p className="text-xs text-gray-500 mb-2">Suggestions could not be loaded.</p>
                    <button onClick={() => refetch()} className="text-xs text-orange-400 hover:underline">Try again</button>
                </div>
            ) : !data || data.length === 0 ? (
                <p className="text-xs text-gray-500 py-2">No suggestions right now. Check back as more people join.</p>
            ) : (
                <ul className="space-y-3">
                    {data.map((m) => {
                        const isFollowing = following.has(m.username);
                        return (
                            <li key={m.id} className="flex items-center gap-3">
                                <Link href={`/user/${m.username}`} className="flex items-center gap-3 flex-1 min-w-0 group">
                                    <PostAvatar name={m.name} avatar={m.avatar} size={36} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white truncate group-hover:text-orange-400 transition-colors">{m.name}</p>
                                        <p className="text-xs text-gray-500 truncate">@{m.username} · {m.reason}</p>
                                    </div>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => toggle(m.username)}
                                    disabled={pending.has(m.username)}
                                    aria-pressed={isFollowing}
                                    aria-label={`${isFollowing ? 'Unfollow' : 'Follow'} ${m.name}`}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors disabled:opacity-60 ${isFollowing ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                                >
                                    {isFollowing ? <UserCheck className="w-3.5 h-3.5" aria-hidden="true" /> : <UserPlus className="w-3.5 h-3.5" aria-hidden="true" />}
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
