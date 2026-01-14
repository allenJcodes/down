'use client'

import dynamic from 'next/dynamic'

const GameCanvas = dynamic(() => import('@/components/game/GameCanvas'), {
    ssr: false,
})

export default function GamePage() {
    return (
        <div className="w-full h-screen">
            <GameCanvas />
        </div>
    )
}
