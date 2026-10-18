"use client";

import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (next: boolean) => void;
    label: string;
    disabled?: boolean;
}

export default function ToggleSwitch({ checked, onChange, label, disabled }: ToggleSwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${checked ? 'bg-orange-500' : 'bg-white/10'}`}
        >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-6' : 'left-1'}`} />
        </button>
    );
}
