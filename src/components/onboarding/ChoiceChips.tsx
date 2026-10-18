"use client";

import React from 'react';

interface Option { slug: string; label: string }

interface Props {
    options: Option[];
    selected: string[];
    onChange: (next: string[]) => void;
    /** 1 makes it a single choice (radios); more makes it a multi-select (checkboxes) */
    max: number;
    label: string;
}

/** Buttons that behave as radios (max 1) or checkboxes, for the interest and level steps */
export default function ChoiceChips({ options, selected, onChange, max, label }: Props) {
    const single = max === 1;
    const full = !single && selected.length >= max;

    const toggle = (slug: string) => {
        if (single) return onChange(selected[0] === slug ? [] : [slug]);
        if (selected.includes(slug)) return onChange(selected.filter((s) => s !== slug));
        if (!full) onChange([...selected, slug]);
    };

    return (
        <div role={single ? 'radiogroup' : 'group'} aria-label={label} className="flex flex-wrap gap-2">
            {options.map((o) => {
                const on = selected.includes(o.slug);
                const blocked = !on && full;
                return (
                    <button
                        key={o.slug}
                        type="button"
                        role={single ? 'radio' : 'checkbox'}
                        aria-checked={on}
                        aria-disabled={blocked || undefined}
                        onClick={() => toggle(o.slug)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${on
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                            : blocked
                                ? 'border-white/5 text-gray-600 cursor-not-allowed'
                                : 'border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                            }`}
                    >
                        {o.label}
                    </button>
                );
            })}
        </div>
    );
}
