'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { BAN_DURATIONS, MUTE_DURATIONS, SANCTION_COPY, type SanctionAction } from '@/types/moderation';

export interface SanctionInput {
    reason: string;
    duration?: string;
}

interface UserSanctionDialogProps {
    action: SanctionAction | null;
    /** Who the decision is about, e.g. "@alice" or "3 users" */
    subject: string;
    busy?: boolean;
    error?: string;
    onConfirm: (input: SanctionInput) => void;
    onCancel: () => void;
}

const REASON_MIN = 3;
const REASON_MAX = 500;

export function UserSanctionDialog({ action, subject, busy = false, error, onConfirm, onCancel }: UserSanctionDialogProps) {
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState<string>('');

    if (!action) return null;
    const copy = SANCTION_COPY[action];
    const durations = action === 'mute' ? MUTE_DURATIONS : action === 'ban' ? BAN_DURATIONS : null;
    const chosenDuration = duration || (durations ? durations[0].value : '');
    const trimmed = reason.trim();
    const reasonOk = copy.reasonRequired ? trimmed.length >= REASON_MIN : true;
    const destructive = action === 'ban' || action === 'mute';

    return (
        <Dialog.Root open onOpenChange={(open) => { if (!open && !busy) onCancel(); }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                    <Dialog.Title className="font-semibold text-white">{copy.title}</Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-gray-400">
                        {subject}. {copy.effect}
                    </Dialog.Description>

                    {durations && (
                        <div className="mt-4">
                            <label htmlFor="sanction-duration" className="block text-sm text-gray-400">Duration</label>
                            <select
                                id="sanction-duration"
                                value={chosenDuration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-orange-500/50 focus:outline-none"
                            >
                                {durations.map((d) => (
                                    <option key={d.value} value={d.value} className="bg-gray-900">{d.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <label htmlFor="sanction-reason" className="mt-4 block text-sm text-gray-400">
                        {copy.reasonRequired ? 'Reason (shown to the user)' : 'Note (optional, kept in the audit log)'}
                    </label>
                    <textarea
                        id="sanction-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        maxLength={REASON_MAX}
                        rows={3}
                        required={copy.reasonRequired}
                        className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none"
                    />
                    {copy.reasonRequired && trimmed.length > 0 && trimmed.length < REASON_MIN && (
                        <p className="mt-1 text-xs text-gray-500">At least {REASON_MIN} characters.</p>
                    )}

                    {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}

                    <div className="mt-5 flex justify-end gap-3">
                        <Dialog.Close
                            disabled={busy}
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
                        >
                            Cancel
                        </Dialog.Close>
                        <button
                            type="button"
                            disabled={busy || !reasonOk}
                            onClick={() => onConfirm({ reason: trimmed, duration: durations ? chosenDuration : undefined })}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${
                                destructive ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'
                            }`}
                        >
                            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                            {copy.label}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
