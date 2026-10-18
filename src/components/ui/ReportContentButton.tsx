"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Flag, Loader2, CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';

export type ReportContentType = 'blog' | 'discussion' | 'feedPost' | 'reply' | 'comment';

interface ReportContentButtonProps {
    contentType: ReportContentType;
    contentId: string;
    /** Id of the content's author; the button is hidden for your own content */
    authorId?: string;
    className?: string;
}

export const REPORT_REASONS = [
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Harassment or bullying' },
    { value: 'hate_speech', label: 'Hate speech' },
    { value: 'misinformation', label: 'Misinformation' },
    { value: 'inappropriate', label: 'Inappropriate content' },
    { value: 'copyright', label: 'Copyright violation' },
    { value: 'other', label: 'Other' },
] as const;

const DETAILS_MAX = 500;

export function ReportContentButton({ contentType, contentId, authorId, className = '' }: ReportContentButtonProps) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    // Signed-out visitors cannot report, and nobody reports their own content
    if (!user || (authorId && authorId === user.id)) return null;

    const reset = () => {
        setReason('');
        setDetails('');
        setDone(false);
        setError('');
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) reset();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason || loading) return;
        setLoading(true);
        setError('');
        try {
            await fetchApi('/api/moderation/flag', {
                method: 'POST',
                body: JSON.stringify({ contentType, contentId, reason, details: details.trim() || undefined }),
            });
            setDone(true);
            addToast({ variant: 'success', title: 'Report submitted', message: 'Thank you. Our team will review it.' });
        } catch (err) {
            // The API explains itself: already reported, daily limit reached, content gone
            setError(err instanceof Error && err.message ? err.message : 'Failed to submit the report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
                <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors ${className}`}
                >
                    <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                    Report
                    <span className="sr-only"> this content</span>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <Dialog.Close
                        className="absolute right-4 top-4 rounded p-1 text-gray-500 hover:text-white"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </Dialog.Close>

                    {done ? (
                        <div className="text-center py-4" role="status">
                            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" aria-hidden="true" />
                            <Dialog.Title className="text-white font-medium">Report submitted</Dialog.Title>
                            <Dialog.Description className="text-gray-400 text-sm mt-1">
                                Thank you for helping keep the community safe.
                            </Dialog.Description>
                            <Dialog.Close className="mt-5 px-5 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded-xl">
                                Close
                            </Dialog.Close>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 mb-5 pr-6">
                                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                    <Flag className="w-4 h-4 text-red-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <Dialog.Title className="text-white font-semibold">Report content</Dialog.Title>
                                    <Dialog.Description className="text-xs text-gray-500">
                                        A moderator will review this against our{' '}
                                        <Link href="/community-guidelines" className="text-orange-400 hover:underline" target="_blank">
                                            community guidelines
                                        </Link>
                                        .
                                    </Dialog.Description>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <fieldset>
                                    <legend className="block text-sm text-gray-400 mb-2">Reason *</legend>
                                    <div className="space-y-2">
                                        {REPORT_REASONS.map((r) => (
                                            <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="report-reason"
                                                    value={r.value}
                                                    checked={reason === r.value}
                                                    onChange={() => setReason(r.value)}
                                                    className="h-4 w-4 accent-orange-500"
                                                />
                                                <span className={`text-sm transition-colors ${reason === r.value ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                    {r.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <div>
                                    <label htmlFor="report-details" className="block text-sm text-gray-400 mb-2">
                                        Additional details (optional)
                                    </label>
                                    <textarea
                                        id="report-details"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder="Provide any additional context..."
                                        rows={3}
                                        maxLength={DETAILS_MAX}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none resize-none"
                                    />
                                    <p className="mt-1 text-right text-xs text-gray-500" aria-hidden="true">
                                        {details.length}/{DETAILS_MAX}
                                    </p>
                                </div>

                                {error && (
                                    <p role="alert" className="text-sm text-red-400">
                                        {error}
                                    </p>
                                )}

                                <div className="flex gap-3 pt-1">
                                    <Dialog.Close
                                        type="button"
                                        className="flex-1 py-2.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </Dialog.Close>
                                    <button
                                        type="submit"
                                        disabled={!reason || loading}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-500/40 text-white font-medium rounded-xl transition-colors"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Flag className="w-4 h-4" aria-hidden="true" />}
                                        Submit report
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
