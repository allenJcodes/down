'use client'

import { useEffect, useRef } from 'react'
import { initGame } from '@/game'

export default function GameCanvas() {
    const gameRef = useRef<Phaser.Game | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && !gameRef.current) {
            gameRef.current = initGame()
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true)
                gameRef.current = null
            }
        }
    }, [])

    return <div id="game-container" />
}
