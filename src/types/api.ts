export interface LeaderboardEntry {
    id: string
    playerName: string
    score: number
    time: number
    healthRemaining: number
    timestamp: Date
}

export interface LeaderboardResponse {
    entries: LeaderboardEntry[]
}

export interface LeaderboardSubmission {
    playerName: string
    score: number
    time: number
    healthRemaining: number
}
