import React from 'react';
import Image from 'next/image';

export default function PostAvatar({
    name,
    avatar,
    size = 40,
}: {
    name?: string | null;
    avatar?: string | null;
    size?: number;
}) {
    const initial = (name || '?').charAt(0).toUpperCase();
    const box = { width: size, height: size };
    return (
        <div
            style={box}
            className="rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden"
        >
            {avatar ? (
                <Image src={avatar} alt="" width={size} height={size} className="object-cover" style={box} unoptimized />
            ) : (
                initial
            )}
        </div>
    );
}
