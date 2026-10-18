"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePublicStats } from '@/hooks/queries';

// A tile shows only once its number is worth showing; a small number would undersell the community
const MIN_MEMBERS = 100;
const MIN_CHALLENGES = 10;
const TOOLS = 22;

const HeroSection = () => {
    const { user } = useAuth();
    const { data: stats } = usePublicStats();
    const tiles = [
        { value: `${TOOLS}`, label: 'Security Tools' },
        ...(stats && stats.challenges >= MIN_CHALLENGES ? [{ value: stats.challenges.toLocaleString(), label: 'CTF Challenges' }] : []),
        ...(stats && stats.members >= MIN_MEMBERS ? [{ value: stats.members.toLocaleString(), label: 'Community Members' }] : []),
    ];

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20">
            {/* Orange gradient shades */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-20 right-[5%] w-[600px] h-[600px] opacity-25"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-40 left-[0%] w-[500px] h-[500px] opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-20 right-[15%] w-[400px] h-[400px] opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-orange-500/20 bg-orange-500/10">
                    <Shield className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-400 font-medium">Open Source Cybersecurity Platform</span>
                </div>

                {/* Main heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                    Learn. Practice.
                    <br />
                    <span className="gradient-text">Master Security.</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Your all-in-one platform for cybersecurity learning.
                    Tools, challenges, cheatsheets, internships, and a thriving community.
                </p>

                {/* CTA buttons — auth-aware */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 btn-press"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/feed"
                                className="group inline-flex items-center gap-3 px-8 py-4 text-gray-900 dark:text-white text-lg font-medium rounded-xl border border-gray-300 dark:border-white/20 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
                            >
                                Open the Feed
                                <ArrowRight className="w-5 h-5 opacity-0 -ml-2 transition-all group-hover:opacity-100 group-hover:ml-0" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth?tab=register"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 btn-press"
                            >
                                Create Free Account
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/tools"
                                className="group inline-flex items-center gap-3 px-8 py-4 text-gray-900 dark:text-white text-lg font-medium rounded-xl border border-gray-300 dark:border-white/20 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
                            >
                                Explore Tools
                                <ArrowRight className="w-5 h-5 opacity-0 -ml-2 transition-all group-hover:opacity-100 group-hover:ml-0" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats: live counts, each shown only when it is worth showing */}
                <div className="flex items-center justify-center gap-8 sm:gap-16">
                    {tiles.map((tile, i) => (
                        <React.Fragment key={tile.label}>
                            {i > 0 && <div className="h-10 w-px bg-gray-200 dark:bg-white/10" aria-hidden="true" />}
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{tile.value}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">{tile.label}</div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
