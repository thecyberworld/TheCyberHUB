import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Badges',
    description: 'Every badge on TheCyberHub: what earns it, how rare it is, and how close you are.',
    openGraph: {
        title: 'Badges | TheCyberHub',
        description: 'Earn badges by solving challenges, keeping a streak and helping the community.',
        type: 'website',
    },
}

export default function BadgesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
