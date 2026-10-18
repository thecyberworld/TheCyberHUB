'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { ACTION_COPY, type ModerationAction } from '@/types/moderation';

interface ModerationActionDialogProps {
    action: ModerationAction | null;
    /** What the decision applies to, e.g. "1 item" or "3 items" */
    subject: string;
    busy?: boolean;
    onConfirm: (note: string) => void;
    onCancel: () => void;
}

const NOTE_MAX = 500;

export function ModerationActionDialog({ action, subject, busy = false, onConfirm, onCancel }: ModerationActionDialogProps) {
    const [note, setNote] = useState('');

    if (!action) return null;
    const copy = ACTION_COPY[action];
    const destructive = action === 'remove' || action === 'hide';

    return (
        <Dialog.Root open onOpenChange={(open) => { if (!open && !busy) { setNote(''); onCancel(); } }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                    <Dialog.Title className="text-white font-semibold">{copy.title}</Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-gray-400">
                        {subject}. {copy.effect}
                    </Dialog.Description>

                    <label htmlFor="moderation-note" className="mt-4 block text-sm text-gray-400">
                        Note (optional, kept in the audit log)
                    </label>
                    <textarea
                        id="moderation-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={NOTE_MAX}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none"
                    />

                    <div className="mt-5 flex justify-end gap-3">
                        <Dialog.Close
                            disabled={busy}
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
                        >
                            Cancel
                        </Dialog.Close>
                        <button
                            type="button"
                            onClick={() => onConfirm(note.trim())}
                            disabled={busy}
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
