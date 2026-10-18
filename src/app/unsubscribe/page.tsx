"use client"

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, MailX } from 'lucide-react';
import { applyUnsubscribe, previewUnsubscribe } from '@/lib/api/notifications';
import type { UnsubscribeScope } from '@/types/notifications';

type Stage =
    | { kind: 'loading' }
    | { kind: 'invalid'; message: string }
    | { kind: 'ready'; scope: UnsubscribeScope; email: string }
    | { kind: 'working'; scope: UnsubscribeScope; email: string }
    | { kind: 'done'; scope: UnsubscribeScope; message: string }
    | { kind: 'failed'; scope: UnsubscribeScope; email: string; message: string };

const WHAT: Record<UnsubscribeScope, { title: string; detail: string }> = {
    digest: { title: 'Stop the weekly digest', detail: 'You will no longer get the weekly summary email. Other emails are not affected.' },
    email: { title: 'Stop all emails', detail: 'You will no longer get emails from us, except security notices about your account.' },
};

function UnsubscribeContent() {
    const token = useSearchParams().get('token');
    const [stage, setStage] = useState<Stage>({ kind: 'loading' });

    useEffect(() => {
        if (!token) {
            setStage({ kind: 'invalid', message: 'This link is missing its token. Open the link from the email again.' });
            return;
        }
        let cancelled = false;
        previewUnsubscribe(token)
            .then((p) => { if (!cancelled) setStage({ kind: 'ready', scope: p.scope, email: p.email }); })
            .catch((err) => {
                if (!cancelled) setStage({ kind: 'invalid', message: err instanceof Error ? err.message : 'This unsubscribe link is invalid or has expired.' });
            });
        return () => { cancelled = true; };
    }, [token]);

    // Nothing changes on a page load: mail scanners open links, so the member confirms with a click
    const confirm = async () => {
        if (!token || (stage.kind !== 'ready' && stage.kind !== 'failed')) return;
        const { scope, email } = stage;
        setStage({ kind: 'working', scope, email });
        try {
            const res = await applyUnsubscribe(token);
            setStage({ kind: 'done', scope: res.scope, message: res.message });
        } catch (err) {
            setStage({ kind: 'failed', scope, email, message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                {stage.kind === 'loading' && (
                    <div role="status" aria-label="Checking your link">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto" aria-hidden="true" />
                    </div>
                )}

                {stage.kind === 'invalid' && (
                    <>
                        <MailX className="w-10 h-10 text-gray-500 mx-auto mb-4" aria-hidden="true" />
                        <h1 className="text-xl font-bold text-white mb-2">This link does not work</h1>
                        <p className="text-gray-400 text-sm mb-6">{stage.message}</p>
                        <Link href="/profile?tab=notifications" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            Change your email settings instead
                        </Link>
                    </>
                )}

                {(stage.kind === 'ready' || stage.kind === 'working' || stage.kind === 'failed') && (
                    <>
                        <MailX className="w-10 h-10 text-orange-400 mx-auto mb-4" aria-hidden="true" />
                        <h1 className="text-xl font-bold text-white mb-2">{WHAT[stage.scope].title}</h1>
                        <p className="text-gray-400 text-sm mb-1">{WHAT[stage.scope].detail}</p>
                        {stage.email && <p className="text-gray-500 text-xs mb-6">Account: {stage.email}</p>}
                        {stage.kind === 'failed' && <p role="alert" className="text-red-400 text-sm mb-4">{stage.message}</p>}
                        <button
                            onClick={confirm}
                            disabled={stage.kind === 'working'}
                            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2"
                        >
                            {stage.kind === 'working' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                            Unsubscribe
                        </button>
                    </>
                )}

                {stage.kind === 'done' && (
                    <div role="status">
                        <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-4" aria-hidden="true" />
                        <h1 className="text-xl font-bold text-white mb-2">You are unsubscribed</h1>
                        <p className="text-gray-400 text-sm mb-6">{stage.message}.</p>
                        <Link href="/profile?tab=notifications" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            Fine-tune your notifications
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={null}>
            <UnsubscribeContent />
        </Suspense>
    );
}
