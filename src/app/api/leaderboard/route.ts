import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { leaderboardEntrySchema } from '@/lib/validations'

// GET - Fetch leaderboard entries
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')
        const sortBy = searchParams.get('sortBy') || 'score'

        const entries = await prisma.leaderboardEntry.findMany({
            take: limit,
            orderBy: sortBy === 'time'
                ? { time: 'asc' }
                : { score: 'desc' },
        })

        return NextResponse.json({ entries })
    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        return NextResponse.json(
            { error: 'Failed to fetch leaderboard' },
            { status: 500 }
        )
    }
}

// POST - Submit new score
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input
        const validatedData = leaderboardEntrySchema.parse(body)

        // Create entry
        const entry = await prisma.leaderboardEntry.create({
            data: validatedData,
        })

        return NextResponse.json({ entry }, { status: 201 })
    } catch (error) {
        console.error('Error creating leaderboard entry:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input data' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to create leaderboard entry' },
            { status: 500 }
        )
    }
}
