"use client";

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNotificationPreferences, useUpdateNotificationPreferences } from '@/hooks/queries';
import type { EmailPreferences, InAppPreferences } from '@/types/notifications';
import ToggleSwitch from './ToggleSwitch';

interface Row {
    label: string;
    hint: string;
    inApp?: keyof InAppPreferences;
    email?: keyof EmailPreferences;
}

const ROWS: Row[] = [
    { label: 'Replies', hint: 'Someone answers your post, comment or forum thread', inApp: 'replies', email: 'replies' },
    { label: 'Comments', hint: 'Someone comments on your post', inApp: 'comments' },
    { label: 'Mentions', hint: 'Someone mentions you with @', inApp: 'mentions', email: 'mentions' },
    { label: 'Likes', hint: 'Someone likes your post', inApp: 'likes' },
    { label: 'Reshares', hint: 'Someone reshares your post', inApp: 'reshares' },
    { label: 'New followers', hint: 'Someone starts following you', inApp: 'follows', email: 'follows' },
    { label: 'Badges', hint: 'You earn a badge', inApp: 'badges', email: 'badges' },
    { label: 'Challenges', hint: 'Your challenge activity and solves', inApp: 'challenges' },
    { label: 'Weekly challenge', hint: 'The new weekly challenge is live', inApp: 'weeklyChallenges', email: 'weeklyChallenges' },
    { label: 'Events', hint: 'Reminders for events you joined', inApp: 'events', email: 'events' },
    { label: 'Contributions', hint: 'Your submissions are approved or rejected', inApp: 'contributions', email: 'contributions' },
    { label: 'Job matches', hint: 'Jobs that fit your skills', inApp: 'jobMatches', email: 'jobMatches' },
    { label: 'Security alerts', hint: 'Sign-ins and changes to your account', inApp: 'securityAlerts', email: 'securityAlerts' },
    { label: 'Newsletter', hint: 'Occasional news from the team', email: 'newsletter' },
];

const isValidZone = (zone: string) => {
    try {
        new Intl.DateTimeFormat('en-GB', { timeZone: zone });
        return true;
    } catch {
        return false;
    }
};

const timeZones = (): string[] => {
    const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
    try {
        return intl.supportedValuesOf ? intl.supportedValuesOf('timeZone') : [];
    } catch {
        return [];
    }
};

const browserZone = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
        return 'UTC';
    }
};

export default function NotificationSettings() {
    const { data: prefs, isLoading, isError, refetch } = useNotificationPreferences();
    const update = useUpdateNotificationPreferences();
    const [zone, setZone] = useState('');
    const [zoneError, setZoneError] = useState(false);

    useEffect(() => {
        if (prefs) setZone(prefs.quietHours.timezone);
    }, [prefs]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-16" role="status" aria-label="Loading notification settings">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    if (isError || !prefs) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-gray-400 mb-3">Your notification settings could not be loaded.</p>
                <button onClick={() => refetch()} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
                    Try again
                </button>
            </div>
        );
    }

    const commitZone = () => {
        const next = zone.trim();
        if (!next || next === prefs.quietHours.timezone) { setZone(prefs.quietHours.timezone); setZoneError(false); return; }
        if (!isValidZone(next)) { setZoneError(true); return; }
        setZoneError(false);
        update.mutate({ quietHours: { timezone: next } });
    };

    const q = prefs.quietHours;
    const inputClass = 'px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-orange-500/50 focus:outline-none transition-colors disabled:opacity-50';

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white mb-1">What you hear about</h2>
                <p className="text-sm text-gray-400 mb-6">Choose where each kind of update reaches you. In the app means the bell and the notifications page.</p>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs uppercase tracking-wide text-gray-500">
                                <th scope="col" className="pb-3 pr-4 font-medium">Update</th>
                                <th scope="col" className="pb-3 px-3 font-medium text-center">In the app</th>
                                <th scope="col" className="pb-3 pl-3 font-medium text-center">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {ROWS.map((row) => (
                                <tr key={row.label}>
                                    <th scope="row" className="py-3 pr-4 font-normal">
                                        <p className="text-sm text-white">{row.label}</p>
                                        <p className="text-xs text-gray-500">{row.hint}</p>
                                    </th>
                                    <td className="py-3 px-3 text-center">
                                        {row.inApp && (
                                            <span className="inline-flex">
                                                <ToggleSwitch
                                                    label={`${row.label} in the app`}
                                                    checked={prefs.inApp[row.inApp]}
                                                    onChange={(v) => update.mutate({ inApp: { [row.inApp as string]: v } })}
                                                />
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 pl-3 text-center">
                                        {row.email && (
                                            <span className="inline-flex">
                                                <ToggleSwitch
                                                    label={`${row.label} by email`}
                                                    checked={prefs.email[row.email]}
                                                    onChange={(v) => update.mutate({ email: { [row.email as string]: v } })}
                                                />
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Weekly digest</h2>
                        <p className="text-sm text-gray-400">A Monday summary of what you missed: replies, new followers, upcoming events.</p>
                    </div>
                    <ToggleSwitch
                        label="Weekly digest email"
                        checked={prefs.emailDigest.enabled}
                        onChange={(v) => update.mutate({ emailDigest: { enabled: v } })}
                    />
                </div>

                <div className="border-t border-white/10 pt-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Quiet hours</h2>
                            <p className="text-sm text-gray-400">No pop-ups and no email during these hours. Everything still waits in your list.</p>
                        </div>
                        <ToggleSwitch
                            label="Quiet hours"
                            checked={q.enabled}
                            onChange={(v) => update.mutate({ quietHours: v && !q.timezone ? { enabled: v, timezone: browserZone() } : { enabled: v } })}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <label className="text-sm text-gray-400">
                            From
                            <input
                                type="time"
                                className={`${inputClass} w-full mt-1`}
                                value={q.start}
                                disabled={!q.enabled}
                                onChange={(e) => e.target.value && update.mutate({ quietHours: { start: e.target.value } })}
                            />
                        </label>
                        <label className="text-sm text-gray-400">
                            Until
                            <input
                                type="time"
                                className={`${inputClass} w-full mt-1`}
                                value={q.end}
                                disabled={!q.enabled}
                                onChange={(e) => e.target.value && update.mutate({ quietHours: { end: e.target.value } })}
                            />
                        </label>
                        <label className="text-sm text-gray-400">
                            Time zone
                            <input
                                type="text"
                                className={`${inputClass} w-full mt-1`}
                                value={zone}
                                disabled={!q.enabled}
                                list="notification-time-zones"
                                aria-invalid={zoneError}
                                onChange={(e) => { setZone(e.target.value); setZoneError(false); }}
                                onBlur={commitZone}
                                onKeyDown={(e) => { if (e.key === 'Enter') commitZone(); }}
                            />
                            {zoneError && <span role="alert" className="text-xs text-red-400">Use a zone name such as Europe/London</span>}
                        </label>
                    </div>
                    {q.enabled && q.timezone === 'UTC' && browserZone() !== 'UTC' && (
                        <button
                            type="button"
                            onClick={() => update.mutate({ quietHours: { timezone: browserZone() } })}
                            className="mt-3 text-xs text-orange-400 hover:text-orange-300"
                        >
                            Use my time zone ({browserZone()})
                        </button>
                    )}
                    <datalist id="notification-time-zones">
                        {timeZones().map((z) => <option key={z} value={z} />)}
                    </datalist>
                </div>
            </div>
        </div>
    );
}
