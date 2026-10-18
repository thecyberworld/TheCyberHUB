"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Loader2, Rocket, X } from 'lucide-react';
import { useOnboarding, useUpdateOnboarding } from '@/hooks/queries';
import type { ChecklistKey } from '@/types/onboarding';

export const CHECKLIST_COPY: Record<ChecklistKey, { title: string; hint: string }> = {
    profile: { title: 'Set up your profile', hint: 'Add a photo, a short bio and a skill' },
    solve: { title: 'Solve your first challenge', hint: 'A beginner challenge takes a few minutes' },
    post: { title: 'Say hello in the feed', hint: 'Post or comment, for example with #introduction' },
    discuss: { title: 'Join a discussion', hint: 'Start a thread or reply in the forums' },
    follow: { title: 'Follow three people', hint: 'Fill your Following feed' },
};

export default function ChecklistCard() {
    const { data, isLoading } = useOnboarding();
    const update = useUpdateOnboarding();

    if (isLoading || !data) return null;
    const { checklist, progress, state } = data;
    // Gone once finished or dismissed
    if (state.checklistDismissedAt || progress.done === progress.total) return null;

    return (
        <section aria-labelledby="checklist-title" className="p-6 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h2 id="checklist-title" className="text-lg font-semibold text-white flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-orange-400" aria-hidden="true" />
                        Getting started
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">{progress.done} of {progress.total} done</p>
                </div>
                <button
                    type="button"
                    onClick={() => update.mutate({ dismissedChecklist: true })}
                    disabled={update.isPending}
                    aria-label="Hide the getting started checklist"
                    className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                    {update.isPending ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <X className="w-4 h-4" aria-hidden="true" />}
                </button>
            </div>

            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={progress.total}
                aria-valuenow={progress.done}
                aria-label="Getting started progress"
                className="h-1.5 rounded-full bg-white/10 mb-4 overflow-hidden"
            >
                <div className="h-full bg-orange-500 transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
            </div>

            <ul className="space-y-2">
                {checklist.map((item) => {
                    const copy = CHECKLIST_COPY[item.key];
                    return (
                        <li key={item.key}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${item.done ? 'border-green-500/20 bg-green-500/5' : 'border-white/10 bg-white/[0.02] hover:border-orange-500/40'}`}
                            >
                                {item.done
                                    ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" aria-hidden="true" />
                                    : <Circle className="w-5 h-5 text-gray-600 shrink-0" aria-hidden="true" />}
                                <div className="min-w-0">
                                    <p className={`text-sm font-medium ${item.done ? 'text-green-300 line-through decoration-green-500/40' : 'text-white'}`}>
                                        {copy.title}{' '}
                                        <span className="sr-only">{item.done ? '(done)' : '(to do)'}</span>
                                    </p>
                                    {!item.done && <p className="text-xs text-gray-500">{copy.hint}</p>}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
