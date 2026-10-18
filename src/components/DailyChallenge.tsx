'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, Clock, CheckCircle, XCircle, Loader2, Brain, ArrowRight, History, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useDailyChallenge, useSubmitDailyChallenge, useDailyHistory } from '@/hooks/queries/useDailyChallenge';

const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10 border-green-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const categoryLabels: Record<string, string> = {
    web: '🌐 Web',
    network: '🔌 Network',
    crypto: '🔐 Crypto',
    forensics: '🔍 Forensics',
    general: '📚 General',
    linux: '🐧 Linux',
    cloud: '☁️ Cloud',
    malware: '🦠 Malware',
};

/** Time left until the next challenge (midnight UTC). Ticks on its own so the card does not re-render every second. */
export function formatCountdown(now: Date): string {
    const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
    const diff = Math.max(0, next - now.getTime());
    const hours = Math.floor(diff / 3_600_000);
    const minutes = Math.floor((diff / 60_000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

function Countdown() {
    const [text, setText] = useState('');
    useEffect(() => {
        const tick = () => setText(formatCountdown(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return <span className="tabular-nums">{text}</span>;
}

export default function DailyChallenge() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const { data: challenge, isLoading, isError, refetch } = useDailyChallenge();
    const submit = useSubmitDailyChallenge();
    const [picked, setPicked] = useState<number | null>(null);
    const [showHistory, setShowHistory] = useState(false);
    const history = useDailyHistory(7, { enabled: showHistory });

    if (isLoading) {
        return (
            <div
                role="status"
                aria-label="Loading daily challenge"
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-center h-48"
            >
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    if (isError) {
        return (
            <div role="alert" className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-400 mb-3">The daily challenge could not be loaded.</p>
                <button
                    onClick={() => refetch()}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!challenge) {
        return (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Daily Challenge</h3>
                        <p className="text-gray-500 text-xs">No challenge available today</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Next challenge in <Countdown /></span>
                </div>
            </div>
        );
    }

    const answered = challenge.hasSubmitted && !!challenge.userSubmission;
    const selected = answered ? challenge.userSubmission!.selectedIndex : picked;
    const result = answered
        ? {
            isCorrect: challenge.userSubmission!.isCorrect,
            xpEarned: challenge.userSubmission!.xpEarned,
            correctIndex: challenge.correctIndex ?? -1,
            explanation: challenge.explanation ?? '',
        }
        : null;
    const signedOut = !user;

    const handleSubmit = () => {
        if (picked === null || submit.isPending || answered) return;
        submit.mutate(picked, {
            onSuccess: (res) => {
                for (const b of res.data.newBadges ?? []) {
                    addToast({ variant: 'success', title: 'Badge unlocked', message: `${b.name}: ${b.description}` });
                }
            },
            onError: (err) => {
                addToast({ variant: 'error', message: err instanceof Error ? err.message : 'Failed to submit answer' });
            },
        });
    };

    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Daily Challenge</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${difficultyColors[challenge.difficulty]}`}>
                                {challenge.difficulty}
                            </span>
                            <span className="text-[10px] text-gray-500">
                                {categoryLabels[challenge.category] || challenge.category}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-orange-400 shrink-0">
                    <Zap className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">+{challenge.xpReward} XP</span>
                </div>
            </div>

            <fieldset className="mb-4 border-0 p-0 m-0 min-w-0">
                <legend className="text-white text-sm font-medium mb-4 leading-relaxed">{challenge.question}</legend>
                <div className="space-y-2">
                    {challenge.options.map((option, idx) => {
                        const isCorrect = !!result && idx === result.correctIndex;
                        const isWrongPick = !!result && idx === selected && !result.isCorrect;
                        let style = 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]';
                        if (result) {
                            style = isCorrect
                                ? 'border-green-500/40 bg-green-500/10'
                                : isWrongPick
                                    ? 'border-red-500/40 bg-red-500/10'
                                    : 'border-white/5 opacity-50';
                        } else if (idx === selected) {
                            style = 'border-orange-500/50 bg-orange-500/10';
                        }
                        const locked = answered || signedOut;
                        return (
                            <label
                                key={idx}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${style} ${locked ? 'cursor-default' : 'cursor-pointer'} focus-within:ring-2 focus-within:ring-orange-500/60`}
                            >
                                <input
                                    type="radio"
                                    name={`daily-${challenge._id}`}
                                    className="sr-only"
                                    checked={selected === idx}
                                    disabled={locked}
                                    onChange={() => setPicked(idx)}
                                />
                                <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-medium text-gray-400 shrink-0" aria-hidden="true">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className={isCorrect ? 'text-green-400' : isWrongPick ? 'text-red-400' : 'text-gray-300'}>
                                    {option}
                                </span>
                                {isCorrect && (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-400 ml-auto shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Correct answer</span>
                                    </>
                                )}
                                {isWrongPick && (
                                    <>
                                        <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Your answer</span>
                                    </>
                                )}
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <div aria-live="polite">
                {result ? (
                    <div className={`rounded-xl p-4 border ${result.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            {result.isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                            ) : (
                                <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                            )}
                            <span className={`font-semibold text-sm ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                {result.isCorrect ? `Correct! +${result.xpEarned} XP` : 'Incorrect'}
                            </span>
                        </div>
                        {result.explanation && <p className="text-xs text-gray-400 leading-relaxed">{result.explanation}</p>}
                        {!result.isCorrect && !result.explanation && result.correctIndex >= 0 && (
                            <p className="text-xs text-gray-400 leading-relaxed">
                                The correct answer was <strong className="text-green-400">{challenge.options[result.correctIndex]}</strong>.
                            </p>
                        )}
                    </div>
                ) : signedOut ? (
                    <Link
                        href="/auth"
                        className="w-full py-3 rounded-xl text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 transition-colors"
                    >
                        Sign in to answer
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={picked === null || submit.isPending}
                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            picked !== null
                                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-white/5 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {submit.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" aria-label="Submitting" />
                        ) : (
                            <>
                                Submit Answer
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    Next challenge in <Countdown />
                </span>
                <div className="flex items-center gap-3">
                    {challenge.successRate !== null && <span>{challenge.successRate}% success rate</span>}
                    {user && (
                        <button
                            onClick={() => setShowHistory((v) => !v)}
                            aria-expanded={showHistory}
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            <History className="w-3 h-3" aria-hidden="true" />
                            History
                            {showHistory ? <ChevronUp className="w-3 h-3" aria-hidden="true" /> : <ChevronDown className="w-3 h-3" aria-hidden="true" />}
                        </button>
                    )}
                </div>
            </div>

            {user && showHistory && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-medium text-gray-400 mb-3">Recent Challenges</h4>
                    {history.isLoading ? (
                        <div className="flex justify-center py-4" role="status" aria-label="Loading history">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-600" aria-hidden="true" />
                        </div>
                    ) : history.isError ? (
                        <p role="alert" className="text-xs text-gray-500 text-center py-3">
                            History could not be loaded.{' '}
                            <button onClick={() => history.refetch()} className="text-orange-400 hover:text-orange-300">Try again</button>
                        </p>
                    ) : !history.data || history.data.submissions.length === 0 ? (
                        <p className="text-xs text-gray-600 text-center py-3">No challenge history yet</p>
                    ) : (
                        <ul className="space-y-2 list-none p-0">
                            {history.data.submissions.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        {item.isCorrect ? (
                                            <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" aria-label="Correct" />
                                        ) : (
                                            <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" aria-label="Incorrect" />
                                        )}
                                        <span className="text-xs text-gray-400 truncate">{item.challenge?.question ?? 'Challenge removed'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        {item.challenge && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${difficultyColors[item.challenge.difficulty]}`}>
                                                {item.challenge.difficulty}
                                            </span>
                                        )}
                                        {item.xpEarned > 0 && <span className="text-[10px] text-orange-400">+{item.xpEarned}</span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
