'use client';

import { ExternalLink, EyeOff, Trash2 } from 'lucide-react';
import {
    CONTENT_TYPE_LABELS,
    REASON_LABELS,
    ACTION_COPY,
    type ModerationAction,
    type ModerationQueueEntry,
} from '@/types/moderation';

interface ModerationQueueItemProps {
    entry: ModerationQueueEntry;
    selected: boolean;
    disabled?: boolean;
    onSelect: (selected: boolean) => void;
    onAction: (action: ModerationAction) => void;
    /** Open the author's moderation panel; omit when the viewer may not sanction them */
    onManageAuthor?: () => void;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

/** Actions that make sense for the item's current state */
export function availableActions(entry: ModerationQueueEntry): ModerationAction[] {
    const { content } = entry;
    if (!content.exists) return entry.status === 'pending' ? ['dismiss'] : [];
    const concealed = !!(content.isHidden || content.isDeleted);
    if (entry.status === 'pending') {
        return concealed ? ['dismiss', 'restore', 'remove'] : ['dismiss', 'hide', 'remove'];
    }
    return concealed ? ['restore'] : [];
}

export function ModerationQueueItem({ entry, selected, disabled = false, onSelect, onAction, onManageAuthor }: ModerationQueueItemProps) {
    const { content } = entry;
    const label = CONTENT_TYPE_LABELS[entry.contentType] || entry.contentType;
    const heading = content.title || label;
    const actions = availableActions(entry);

    return (
        <li
            className={`rounded-xl border bg-white/[0.02] p-5 ${entry.status === 'pending' ? 'border-yellow-500/20' : 'border-white/10'}`}
            data-testid="queue-item"
        >
            <div className="flex gap-4">
                <input
                    type="checkbox"
                    checked={selected}
                    disabled={disabled || actions.length === 0}
                    onChange={(e) => onSelect(e.target.checked)}
                    aria-label={`Select ${heading}`}
                    className="mt-1 h-4 w-4 flex-shrink-0 accent-orange-500"
                />

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400">{label}</span>
                        <span className="rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                            {entry.reportCount} {entry.reportCount === 1 ? 'report' : 'reports'}
                        </span>
                        {entry.reasons.map((r) => (
                            <span key={r.reason} className="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                                {REASON_LABELS[r.reason] || r.reason}{r.count > 1 ? ` ×${r.count}` : ''}
                            </span>
                        ))}
                        {content.isHidden && !content.isDeleted && (
                            <span className="inline-flex items-center gap-1 rounded border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-xs text-orange-400">
                                <EyeOff className="h-3 w-3" aria-hidden="true" />
                                {content.hiddenReason === 'auto' ? 'Hidden automatically' : 'Hidden'}
                            </span>
                        )}
                        {content.isDeleted && (
                            <span className="inline-flex items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                                <Trash2 className="h-3 w-3" aria-hidden="true" />
                                Removed
                            </span>
                        )}
                    </div>

                    {content.exists ? (
                        <>
                            <h3 className="truncate text-sm font-medium text-white">{heading}</h3>
                            {content.excerpt && (
                                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-400">
                                    {content.excerpt}
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-sm italic text-gray-500">This content no longer exists.</p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                        {content.author && (
                            <span>
                                By <span className="text-gray-400">@{content.author.username}</span>
                                {content.author.role && content.author.role !== 'user' && ` (${content.author.role})`}
                                {onManageAuthor && (
                                    <button
                                        type="button"
                                        onClick={onManageAuthor}
                                        className="ml-2 text-orange-400 hover:text-orange-300"
                                    >
                                        Manage user{' '}
                                        <span className="sr-only">@{content.author.username}</span>
                                    </button>
                                )}
                            </span>
                        )}
                        <span>First report {formatDate(entry.firstReportedAt)}</span>
                        {entry.reportCount > 1 && <span>Latest {formatDate(entry.lastReportedAt)}</span>}
                        {content.exists && content.link && (
                            <a
                                href={content.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300"
                            >
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                Open in context
                            </a>
                        )}
                    </div>
                </div>

                {actions.length > 0 && (
                    <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-start">
                        {actions.map((action) => (
                            <button
                                key={action}
                                type="button"
                                disabled={disabled}
                                onClick={() => onAction(action)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                                    action === 'remove'
                                        ? 'border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                        : action === 'hide'
                                            ? 'border-orange-500/20 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
                                            : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                            >
                                {ACTION_COPY[action].label}{' '}
                                <span className="sr-only">{heading}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}
