"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { NotificationIcon, safeLink } from '@/lib/notificationMeta';
import { timeAgo } from '@/lib/feedFormat';
import type { NotificationData } from '@/types/notifications';

interface Props {
    notification: NotificationData;
    onRead: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function NotificationRow({ notification: n, onRead, onDelete }: Props) {
    const href = safeLink(n.link);

    const body = (
        <>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden ${!n.read ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-white/5 border border-white/5'}`}>
                {n.actor?.avatar ? (
                    <Image src={n.actor.avatar} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" unoptimized />
                ) : (
                    <NotificationIcon type={n.type} />
                )}
            </div>
            <div className="flex-1 min-w-0 text-left">
                <p className={`text-sm leading-snug break-words ${n.read ? 'text-gray-400' : 'text-white'}`}>
                    {n.actor?.username && <span className="font-medium text-white">@{n.actor.username} </span>}
                    {n.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    <time dateTime={n.createdAt}>{timeAgo(n.createdAt)}</time>
                    {!n.read && <span className="sr-only"> (unread)</span>}
                </p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" aria-hidden="true" />}
        </>
    );

    const rowClass = `flex-1 min-w-0 flex items-start gap-4 pl-5 py-4 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none ${onDelete ? 'pr-2' : 'pr-5'}`;

    return (
        <li className={`flex items-stretch group ${!n.read ? 'bg-orange-500/[0.03]' : ''}`}>
            {href ? (
                <Link href={href} onClick={() => !n.read && onRead(n._id)} className={rowClass}>
                    {body}
                </Link>
            ) : (
                <button type="button" onClick={() => !n.read && onRead(n._id)} className={`${rowClass} cursor-default`}>
                    {body}
                </button>
            )}
            {onDelete && (
                <button
                    type="button"
                    onClick={() => onDelete(n._id)}
                    aria-label="Delete this notification"
                    className="px-3 text-gray-500 hover:text-white focus-visible:text-white opacity-60 group-hover:opacity-100 focus-visible:opacity-100 transition"
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </li>
    );
}
