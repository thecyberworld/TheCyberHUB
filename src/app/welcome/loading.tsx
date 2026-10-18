import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center" role="status" aria-label="Loading">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" aria-hidden="true" />
        </div>
    )
}
