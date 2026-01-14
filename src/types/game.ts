export interface GameState {
    playerName: string
    currentHealth: number
    currentTime: number
    levelProgress: number
    highScore: number
}

export interface MovementConfig {
    walkSpeed: number
    jumpVelocity: number
    gravity: number
    dropMultiplier: number
}

export interface PlayerHealthConfig {
    max: number
    current: number
    invulnerabilityTime: number
}

export const MOVEMENT_CONFIG: MovementConfig = {
    walkSpeed: 200,
    jumpVelocity: -400,
    gravity: 800,
    dropMultiplier: 2.5,
}

export const PLAYER_HEALTH_CONFIG: PlayerHealthConfig = {
    max: 3,
    current: 3,
    invulnerabilityTime: 1000,
}
