'use client';

import { useCallback, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Ban, Loader2, VolumeX, AlertTriangle, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { canSanctionUser } from '@/lib/roles';
import { UserSanctionDialog, type SanctionInput } from './UserSanctionDialog';
import { SANCTION_COPY, type SanctionAction, type UserModerationHistory } from '@/types/moderation';

interface UserModerationPanelProps {
    userId: string | null;
    onClose: () => void;
    /** Called after a decision so the page can refresh anything that shows the user's state */
    onChanged?: () => void;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const TYPE_LABEL = { warn: 'Warning', mute: 'Mute', ban: 'Ban' } as const;

function sanctionStatus(s: UserModerationHistory['sanctions'][number]): string {
    if (s.type === 'warn') return 'Recorded';
    if (s.isInEffect) return s.expiresAt ? `Until ${formatDate(s.expiresAt)}` : 'In effect';
    if (s.revokedReason === 'lifted') return 'Lifted';
    if (s.revokedReason === 'superseded') return 'Replaced';
    return 'Ended';
}

export function UserModerationPanel({ userId, onClose, onChanged }: UserModerationPanelProps) {
    const { user: viewer } = useAuth();
    const { addToast } = useToast();
    const [history, setHistory] = useState<UserModerationHistory | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [action, setAction] = useState<SanctionAction | null>(null);
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState('');

    const load = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setLoadError('');
        try {
            const res = await fetchApi(`/api/moderation/users/${userId}/history`);
            setHistory(res.data);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : 'Could not load this user');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        setHistory(null);
        setAction(null);
        if (userId) load();
    }, [userId, load]);

    const apply = async ({ reason, duration }: SanctionInput) => {
        if (!userId || !action) return;
        setBusy(true);
        setActionError('');
        try {
            await fetchApi(`/api/moderation/users/${userId}/${action}`, {
                method: 'POST',
                body: JSON.stringify({ reason: reason || undefined, duration }),
            });
            addToast({ variant: 'success', title: 'Done', message: `${SANCTION_COPY[action].label} recorded.` });
            setAction(null);
            await load();
            onChanged?.();
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Could not apply this decision');
        } finally {
            setBusy(false);
        }
    };

    const target = history?.user;
    const allowed = canSanctionUser(
        viewer ? { id: viewer.id, role: viewer.role } : null,
        target ? { id: target._id, role: target.role } : null,
    );

    return (
        <>
            <Dialog.Root open={!!userId} onOpenChange={(open) => { if (!open && !busy) onClose(); }}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                        <Dialog.Close className="absolute right-4 top-4 rounded p-1 text-gray-500 hover:text-white" aria-label="Close">
                            <X className="h-4 w-4" aria-hidden="true" />
                        </Dialog.Close>
                        <Dialog.Title className="pr-8 font-semibold text-white">
                            {target ? `@${target.username}` : 'User'}
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 text-sm text-gray-400">
                            Moderation history and actions
                        </Dialog.Description>

                        {loading && !history ? (
                            <div className="flex justify-center py-10" role="status" aria-label="Loading user">
                                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                            </div>
                        ) : loadError ? (
                            <div role="alert" className="py-8 text-center">
                                <p className="mb-3 text-sm text-red-400">{loadError}</p>
                                <button type="button" onClick={load} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                                    Retry
                                </button>
                            </div>
                        ) : history && target ? (
                            <>
                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-gray-400 capitalize">{target.role}</span>
                                    {target.isBanned && (
                                        <span className="inline-flex items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-red-400">
                                            <Ban className="h-3 w-3" aria-hidden="true" />
                                            {target.banExpiresAt ? `Banned until ${formatDate(target.banExpiresAt)}` : 'Banned'}
                                        </span>
                                    )}
                                    {target.mutedUntil && (
                                        <span className="inline-flex items-center gap-1 rounded border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-orange-400">
                                            <VolumeX className="h-3 w-3" aria-hidden="true" />
                                            Muted until {formatDate(target.mutedUntil)}
                                        </span>
                                    )}
                                    {!target.isBanned && !target.mutedUntil && (
                                        <span className="rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-green-400">In good standing</span>
                                    )}
                                    <span className="text-gray-500">
                                        {history.counts.warn} warnings · {history.counts.mute} mutes · {history.counts.ban} bans
                                    </span>
                                </div>
                                {target.isBanned && target.banReason && (
                                    <p className="mt-2 text-xs text-gray-500">Ban reason: {target.banReason}</p>
                                )}

                                {allowed ? (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <button type="button" onClick={() => setAction('warn')} className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400 hover:bg-yellow-500/20">
                                            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> Warn
                                        </button>
                                        {target.mutedUntil ? (
                                            <button type="button" onClick={() => setAction('unmute')} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/10">
                                                Lift mute
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => setAction('mute')} className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-400 hover:bg-orange-500/20">
                                                <VolumeX className="h-3.5 w-3.5" aria-hidden="true" /> Mute
                                            </button>
                                        )}
                                        {target.isBanned ? (
                                            <button type="button" onClick={() => setAction('unban')} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/10">
                                                Lift ban
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => setAction('ban')} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20">
                                                <Ban className="h-3.5 w-3.5" aria-hidden="true" /> Ban
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-4 text-xs text-gray-500">You cannot sanction someone of an equal or higher role.</p>
                                )}

                                <h3 className="mt-6 text-sm font-medium text-white">History</h3>
                                {history.sanctions.length === 0 ? (
                                    <p className="mt-2 text-sm text-gray-500">Nothing on record.</p>
                                ) : (
                                    <ul className="mt-2 space-y-2">
                                        {history.sanctions.map((s) => (
                                            <li key={s._id} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <span className="font-medium text-white">{TYPE_LABEL[s.type]}</span>
                                                    <span className={`text-xs ${s.isInEffect ? 'text-red-400' : 'text-gray-500'}`}>{sanctionStatus(s)}</span>
                                                </div>
                                                <p className="mt-0.5 break-words text-gray-400">{s.reason}</p>
                                                <p className="mt-1 text-xs text-gray-600">
                                                    {formatDate(s.createdAt)}{s.issuedBy ? ` · by @${s.issuedBy.username}` : ''}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : null}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <UserSanctionDialog
                key={action ?? 'closed'}
                action={action}
                subject={target ? `@${target.username}` : 'This user'}
                busy={busy}
                error={actionError}
                onConfirm={apply}
                onCancel={() => { setAction(null); setActionError(''); }}
            />
        </>
    );
}
