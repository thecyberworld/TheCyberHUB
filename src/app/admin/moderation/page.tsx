'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import { isModeratorRole, canSanctionUser } from '@/lib/roles';
import {
    Flag,
    ArrowLeft,
    Loader2,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Filter,
} from 'lucide-react';
import { ModerationQueueItem, availableActions } from '@/components/admin/ModerationQueueItem';
import { ModerationActionDialog } from '@/components/admin/ModerationActionDialog';
import { UserModerationPanel } from '@/components/admin/UserModerationPanel';
import {
    CONTENT_TYPE_LABELS,
    REASON_LABELS,
    type BulkResult,
    type FlagStatus,
    type ModerationAction,
    type ModerationQueueEntry,
    type ModerationStats,
} from '@/types/moderation';

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const STATUSES: FlagStatus[] = ['pending', 'reviewed', 'resolved', 'dismissed'];

const STATUS_STYLES: Record<FlagStatus, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
    dismissed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const PAGE_SIZE = 20;
const entryKey = (e: Pick<ModerationQueueEntry, 'contentType' | 'contentId'>) => `${e.contentType}:${e.contentId}`;

/** What the dialog is about to apply: one item (from a row button) or the current selection */
type Pending = { action: ModerationAction; entries: ModerationQueueEntry[] };

export default function AdminModerationPage() {
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    const [entries, setEntries] = useState<ModerationQueueEntry[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
    const [stats, setStats] = useState<ModerationStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [statusFilter, setStatusFilter] = useState<FlagStatus>('pending');
    const [typeFilter, setTypeFilter] = useState('');
    const [reasonFilter, setReasonFilter] = useState('');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [pending, setPending] = useState<Pending | null>(null);
    const [busy, setBusy] = useState(false);
    const [panelUserId, setPanelUserId] = useState<string | null>(null);

    const allowed = !!user && isModeratorRole(user.role);

    const loadStats = useCallback(async () => {
        try {
            const res = await fetchApi('/api/moderation/stats');
            setStats(res.data || null);
        } catch {
            // The header is a nicety; the queue still works without it
            setStats(null);
        }
    }, []);

    const loadQueue = useCallback(async (page = 1) => {
        setLoading(true);
        setLoadError('');
        try {
            const params = new URLSearchParams({ status: statusFilter, page: String(page), limit: String(PAGE_SIZE) });
            if (typeFilter) params.set('contentType', typeFilter);
            if (reasonFilter) params.set('reason', reasonFilter);
            const res = await fetchApi(`/api/moderation/queue/items?${params}`);
            setEntries(res.data || []);
            setPagination(res.pagination || { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
            setSelected(new Set());
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : 'Failed to load the moderation queue');
        } finally {
            setLoading(false);
        }
    }, [statusFilter, typeFilter, reasonFilter]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) { router.push('/auth'); return; }
        if (!isModeratorRole(user.role)) { router.push('/admin'); return; }
        loadQueue(1);
    }, [authLoading, user, loadQueue, router]);

    useEffect(() => {
        if (allowed) loadStats();
    }, [allowed, loadStats]);

    const selectedEntries = useMemo(() => entries.filter((e) => selected.has(entryKey(e))), [entries, selected]);

    // The bulk bar only offers actions that apply to every selected item
    const bulkActions = useMemo(() => {
        if (selectedEntries.length === 0) return [] as ModerationAction[];
        return availableActions(selectedEntries[0]).filter((a) =>
            selectedEntries.every((e) => availableActions(e).includes(a))
        );
    }, [selectedEntries]);

    const selectableEntries = entries.filter((e) => availableActions(e).length > 0);
    const allSelected = selectableEntries.length > 0 && selectableEntries.every((e) => selected.has(entryKey(e)));

    const toggle = (entry: ModerationQueueEntry, on: boolean) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (on) next.add(entryKey(entry)); else next.delete(entryKey(entry));
            return next;
        });
    };

    const toggleAll = (on: boolean) => {
        setSelected(on ? new Set(selectableEntries.map(entryKey)) : new Set());
    };

    const confirm = async (note: string) => {
        if (!pending) return;
        const { action, entries: targets } = pending;
        setBusy(true);
        try {
            if (targets.length === 1) {
                const [target] = targets;
                await fetchApi('/api/moderation/items/review', {
                    method: 'POST',
                    body: JSON.stringify({ contentType: target.contentType, contentId: target.contentId, action, note: note || undefined }),
                });
                addToast({ variant: 'success', title: 'Done', message: 'Decision recorded.' });
            } else {
                const res = await fetchApi('/api/moderation/items/bulk', {
                    method: 'POST',
                    body: JSON.stringify({
                        items: targets.map((t) => ({ contentType: t.contentType, contentId: t.contentId })),
                        action,
                        note: note || undefined,
                    }),
                });
                const results: BulkResult[] = res.data || [];
                const failed = results.filter((r) => !r.ok);
                if (failed.length === 0) {
                    addToast({ variant: 'success', title: 'Done', message: `${results.length} items updated.` });
                } else {
                    addToast({
                        variant: 'error',
                        title: `${failed.length} of ${results.length} failed`,
                        message: failed[0].error || 'Some items could not be updated. They are still in the queue.',
                    });
                }
            }
            setPending(null);
            await Promise.all([loadQueue(pagination.page), loadStats()]);
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Could not apply the decision' });
        } finally {
            setBusy(false);
        }
    };

    if (authLoading || !allowed) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" aria-label="Loading" />
            </div>
        );
    }

    const pendingTotal = stats?.flagsByStatus?.pending;
    const subject = pending ? `${pending.entries.length} ${pending.entries.length === 1 ? 'item' : 'items'}` : '';

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Admin
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <Flag className="w-5 h-5 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Moderation Queue</h1>
                    </div>
                    <p className="text-gray-400 text-sm ml-[52px]">
                        {pagination.total} {statusFilter} {pagination.total === 1 ? 'item' : 'items'}
                        {stats && statusFilter === 'pending' && stats.oldestPendingAt && (
                            <> · oldest open report {new Date(stats.oldestPendingAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                        )}
                    </p>
                </div>

                {stats && (
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" aria-label="Moderation summary">
                        {[
                            ['Open reports', pendingTotal ?? 0],
                            ['Actions, last 7 days', Object.values(stats.actionsLast7Days || {}).reduce((a, b) => a + b, 0)],
                            ['Resolved', stats.flagsByStatus?.resolved ?? 0],
                            ['Dismissed', stats.flagsByStatus?.dismissed ?? 0],
                        ].map(([label, value]) => (
                            <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                                <dt className="text-xs text-gray-500">{label}</dt>
                                <dd className="text-xl font-semibold text-white">{value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
                        <span className="text-sm text-gray-500">Status:</span>
                    </div>
                    {STATUSES.map((s) => (
                        <button
                            key={s}
                            type="button"
                            aria-pressed={statusFilter === s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                                statusFilter === s ? STATUS_STYLES[s] : 'border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                    <div className="h-5 w-px bg-white/10 self-center" />
                    <select
                        aria-label="Filter by content type"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-orange-500/50"
                    >
                        <option value="" className="bg-gray-900">All types</option>
                        {Object.entries(CONTENT_TYPE_LABELS).map(([k, v]) => (
                            <option key={k} value={k} className="bg-gray-900">{v}</option>
                        ))}
                    </select>
                    <select
                        aria-label="Filter by reason"
                        value={reasonFilter}
                        onChange={(e) => setReasonFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-orange-500/50"
                    >
                        <option value="" className="bg-gray-900">All reasons</option>
                        {Object.entries(REASON_LABELS).map(([k, v]) => (
                            <option key={k} value={k} className="bg-gray-900">{v}</option>
                        ))}
                    </select>
                </div>

                {/* Bulk bar */}
                {selectableEntries.length > 0 && (
                    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5">
                        <label className="flex items-center gap-2 text-sm text-gray-400">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => toggleAll(e.target.checked)}
                                className="h-4 w-4 accent-orange-500"
                            />
                            Select all on this page
                        </label>
                        {selectedEntries.length > 0 && (
                            <>
                                <span className="text-sm text-white">{selectedEntries.length} selected</span>
                                {bulkActions.length === 0 ? (
                                    <span className="text-xs text-gray-500">No single action fits all selected items.</span>
                                ) : (
                                    bulkActions.map((action) => (
                                        <button
                                            key={action}
                                            type="button"
                                            onClick={() => setPending({ action, entries: selectedEntries })}
                                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium capitalize text-gray-200 hover:bg-white/10"
                                        >
                                            {action} selected
                                        </button>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Queue */}
                {loading ? (
                    <div className="flex justify-center py-20" role="status" aria-label="Loading queue">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : loadError ? (
                    <div role="alert" className="text-center py-16 rounded-2xl border border-red-500/20 bg-red-500/5">
                        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-1">Could not load the queue</h3>
                        <p className="text-gray-400 text-sm mb-4">{loadError}</p>
                        <button
                            type="button"
                            onClick={() => loadQueue(pagination.page)}
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                        >
                            Retry
                        </button>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-1">Queue is clear</h3>
                        <p className="text-gray-400 text-sm">No {statusFilter} reports to review.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {entries.map((entry) => (
                            <ModerationQueueItem
                                key={entryKey(entry)}
                                entry={entry}
                                selected={selected.has(entryKey(entry))}
                                disabled={busy}
                                onSelect={(on) => toggle(entry, on)}
                                onAction={(action) => setPending({ action, entries: [entry] })}
                                onManageAuthor={
                                    entry.content.author && canSanctionUser(user, { id: entry.content.author._id, role: entry.content.author.role })
                                        ? () => setPanelUserId(entry.content.author!._id)
                                        : undefined
                                }
                            />
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                {!loadError && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8">
                        <p className="text-sm text-gray-500">
                            Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Previous page"
                                onClick={() => loadQueue(pagination.page - 1)}
                                disabled={pagination.page <= 1 || loading}
                                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-40 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next page"
                                onClick={() => loadQueue(pagination.page + 1)}
                                disabled={pagination.page >= pagination.totalPages || loading}
                                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-40 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <UserModerationPanel userId={panelUserId} onClose={() => setPanelUserId(null)} onChanged={() => loadStats()} />

            <ModerationActionDialog
                key={pending ? `${pending.action}:${pending.entries.map(entryKey).join(',')}` : 'closed'}
                action={pending?.action ?? null}
                subject={subject}
                busy={busy}
                onConfirm={confirm}
                onCancel={() => setPending(null)}
            />
        </div>
    );
}
