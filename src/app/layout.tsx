import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'DOWN - Platformer Game',
    description: 'A 2D platformer where you race to reach the bottom',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-black text-white">{children}</body>
        </html>
    )
}
