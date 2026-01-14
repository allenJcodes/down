import Phaser from 'phaser'
import { InstructionsScene } from './scenes/InstructionsScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { TutorialRoom1Scene } from './scenes/TutorialRoom1Scene'
import { TutorialRoom2Scene } from './scenes/TutorialRoom2Scene'
import { TutorialRoom3Scene } from './scenes/TutorialRoom3Scene'
import { TestLevelScene } from './scenes/TestLevelScene'

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 800 },
            debug: false,
        },
    },
    scene: [
        TestLevelScene,
        InstructionsScene,
        MainMenuScene,
        TutorialRoom1Scene,
        TutorialRoom2Scene,
        TutorialRoom3Scene,
    ],
}
