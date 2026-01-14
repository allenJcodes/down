import { z } from 'zod'

export const leaderboardEntrySchema = z.object({
    playerName: z.string().min(1).max(20),
    score: z.number().int().min(0),
    time: z.number().int().min(0),
    healthRemaining: z.number().int().min(0).max(3),
})

export type LeaderboardEntryInput = z.infer<typeof leaderboardEntrySchema>
