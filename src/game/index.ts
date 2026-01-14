import Phaser from 'phaser'
import { gameConfig } from './config'

export function initGame(): Phaser.Game {
    return new Phaser.Game(gameConfig)
}
