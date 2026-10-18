"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOnboarding, useOnboardingOptions, useUpdateOnboarding } from '@/hooks/queries';
import ChoiceChips from '@/components/onboarding/ChoiceChips';
import SuggestedFollows from '@/components/onboarding/SuggestedFollows';
import { trackEvent } from '@/lib/analytics';

const STEPS = ['Your interests', 'Your level', 'Your people'] as const;
/** The API allows 8; five keeps the picks meaningful */
const MAX_PICKS = 5;

export default function WelcomePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const options = useOnboardingOptions();
    const state = useOnboarding();
    const update = useUpdateOnboarding();

    const [step, setStep] = useState(0);
    const [interests, setInterests] = useState<string[]>([]);
    const [level, setLevel] = useState<string[]>([]);
    const [goal, setGoal] = useState<string[]>([]);
    const seeded = useRef(false);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!authLoading && !user) router.replace('/auth?redirect=/welcome');
    }, [authLoading, user, router]);

    // Pick up where the member left off, once
    useEffect(() => {
        const s = state.data;
        if (!s || seeded.current) return;
        seeded.current = true;
        setInterests(s.interests);
        setLevel(s.experienceLevel ? [s.experienceLevel] : []);
        setGoal(s.goal ? [s.goal] : []);
        if (s.needsOnboarding) setStep(Math.min(s.state.step, STEPS.length - 1));
    }, [state.data]);

    // A new step starts at its heading, for screen readers and keyboards
    useEffect(() => {
        headingRef.current?.focus();
    }, [step]);

    if (authLoading || !user || options.isLoading || state.isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center" role="status" aria-label="Loading">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    if (options.isError || !options.data) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3 px-4 text-center">
                <p className="text-gray-300">The welcome steps could not be loaded.</p>
                <div className="flex gap-3">
                    <button onClick={() => options.refetch()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">Try again</button>
                    <Link href="/dashboard" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">Skip to the dashboard</Link>
                </div>
            </div>
        );
    }

    const { interests: interestOptions, experienceLevels, goals } = options.data;
    const busy = update.isPending;
    // Forum categories share their slug with the community interests
    const forumShortcuts = interestOptions.filter((o) => o.group === 'community' && interests.includes(o.slug));
    const groups = [
        { id: 'challenges', title: 'CTF challenges' },
        { id: 'community', title: 'Community topics' },
    ] as const;

    const next = () => {
        if (step === 0) {
            update.mutate({ step: 1, interests }, { onSuccess: () => setStep(1) });
        } else if (step === 1) {
            update.mutate(
                { step: 2, experienceLevel: level[0] ?? null, goal: goal[0] ?? null },
                { onSuccess: () => setStep(2) },
            );
        }
    };

    const finish = () => {
        update.mutate({ completed: true }, {
            onSuccess: () => {
                trackEvent('onboarding_complete', { interests: interests.length, level: level[0] ?? null });
                router.push('/dashboard?welcome=1');
            },
        });
    };

    const skip = () => {
        update.mutate({ skipped: true }, {
            onSuccess: () => {
                trackEvent('onboarding_skip', { step });
                router.push('/dashboard');
            },
        });
    };

    return (
        <div className="min-h-screen bg-black px-4 pt-28 pb-16">
            <div className="max-w-2xl mx-auto">
                <ol className="flex items-center justify-center gap-2 mb-8" aria-label="Progress">
                    {STEPS.map((label, i) => (
                        <li key={label} aria-current={i === step ? 'step' : undefined} className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${i === step ? 'bg-orange-500' : i < step ? 'bg-orange-500/50' : 'bg-white/15'}`} />
                            <span className="sr-only">{`Step ${i + 1} of ${STEPS.length}: ${label}`}</span>
                        </li>
                    ))}
                </ol>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                    {step === 0 && (
                        <>
                            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white mb-1 outline-none">What do you want to learn?</h1>
                            <p className="text-sm text-gray-400 mb-6">Pick up to {MAX_PICKS}. We use this to suggest challenges and people.</p>
                            <div className="space-y-5">
                                {groups.map((g) => (
                                    <div key={g.id}>
                                        <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-2">{g.title}</h2>
                                        <ChoiceChips
                                            label={g.title}
                                            options={interestOptions.filter((o) => o.group === g.id)}
                                            selected={interests}
                                            max={MAX_PICKS}
                                            onChange={setInterests}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white mb-1 outline-none">How much experience do you have?</h1>
                            <p className="text-sm text-gray-400 mb-6">No wrong answer. It tunes which challenges we suggest first.</p>
                            <div className="space-y-6">
                                <ChoiceChips label="Experience level" options={experienceLevels} selected={level} max={1} onChange={setLevel} />
                                <div>
                                    <h2 className="text-sm font-medium text-white mb-2">What is your goal? <span className="text-gray-500 font-normal">(optional)</span></h2>
                                    <ChoiceChips label="Goal" options={goals} selected={goal} max={1} onChange={setGoal} />
                                </div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white mb-1 outline-none">Follow a few people</h1>
                            <p className="text-sm text-gray-400 mb-6">Their posts and activity fill your Following feed. You can change this any time.</p>
                            <SuggestedFollows limit={8} />
                            {forumShortcuts.length > 0 && (
                                <div className="mt-6 pt-5 border-t border-white/10">
                                    <h2 className="text-sm font-medium text-white mb-2">Join a discussion</h2>
                                    <ul className="flex flex-wrap gap-2">
                                        {forumShortcuts.map((o) => (
                                            <li key={o.slug}>
                                                <Link href={`/forums?category=${o.slug}`} className="inline-block px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/30 transition-colors">
                                                    {o.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => setStep((s) => Math.max(0, s - 1))}
                            disabled={step === 0 || busy}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-0 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                        </button>
                        <div className="flex items-center gap-4">
                            <button type="button" onClick={skip} disabled={busy} className="text-sm text-gray-500 hover:text-white transition-colors">
                                Skip for now
                            </button>
                            {step < STEPS.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={busy || (step === 0 && interests.length === 0) || (step === 1 && level.length === 0)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                                    Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={finish}
                                    disabled={busy}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
