"use client"

import React from 'react';
import Link from 'next/link';
import { Bell, Check } from 'lucide-react';
import NotificationRow from '@/components/notifications/NotificationRow';
import type { NotificationData } from '@/types/notifications';

interface NotificationDropdownProps {
    notifications: NotificationData[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
}

export const NotificationDropdown = ({ notifications, unreadCount, markAsRead, markAllAsRead }: NotificationDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Escape and a click or tap outside close it; focus goes back to the bell
    React.useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setIsOpen(false); buttonRef.current?.focus(); }
        };
        const onPointer = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointer);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointer);
        };
    }, [isOpen]);

    // A mouse can just hover; touch and keyboard use the button
    const hoverOpen = (e: React.PointerEvent) => { if (e.pointerType === 'mouse') setIsOpen(true); };
    const hoverClose = (e: React.PointerEvent) => { if (e.pointerType === 'mouse') setIsOpen(false); };

    const recent = notifications.slice(0, 10);

    return (
        <div ref={rootRef} className="relative" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen((o) => !o)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all relative"
                aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls="notification-menu"
            >
                <Bell className="w-5 h-5" aria-hidden="true" />
                {unreadCount > 0 && (
                    <span aria-hidden="true" className="absolute top-1 right-1.5 min-w-[16px] h-[16px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-black">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div id="notification-menu" className="absolute top-full right-0 pt-2 w-80 max-w-[calc(100vw-1rem)] z-50">
                    <div className="bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    onClick={markAllAsRead}
                                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                                >
                                    <Check className="w-3 h-3" aria-hidden="true" /> Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-[320px] overflow-y-auto">
                            {recent.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-gray-500">No notifications yet</div>
                            ) : (
                                <ul className="divide-y divide-white/5" onClick={() => setIsOpen(false)}>
                                    {recent.map((n) => (
                                        <NotificationRow key={n._id} notification={n} onRead={markAsRead} />
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="border-t border-white/10">
                            <Link
                                href="/notifications"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 text-center text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                View all notifications →
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
