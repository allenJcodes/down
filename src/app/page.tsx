'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to game on load
        router.push('/game')
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-2xl">Loading...</p>
        </div>
    )
}
