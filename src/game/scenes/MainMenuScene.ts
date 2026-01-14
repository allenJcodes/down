import Phaser from 'phaser'

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' })
    }

    create() {
        const { width, height } = this.cameras.main
        const playerName = this.registry.get('playerName') || 'Player'

        // Player name display
        this.add.text(width - 20, 20, playerName, {
            fontSize: '20px',
            color: '#00ffff',
        }).setOrigin(1, 0)

        // Title
        this.add.text(width / 2, height / 2 - 150, 'DOWN', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold',
        }).setOrigin(0.5)

        // Menu buttons
        this.createButton(width / 2, height / 2 - 20, 'Play', () => {
            this.scene.start('TutorialRoom1Scene')
        })

        this.createButton(width / 2, height / 2 + 40, 'Leaderboards', () => {
            console.log('Leaderboards - Coming soon')
        })

        this.createButton(width / 2, height / 2 + 100, 'Options', () => {
            console.log('Options - Coming soon')
        })
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const button = this.add.text(x, y, text, {
            fontSize: '28px',
            color: '#00ffff',
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setColor('#ffffff'))
            .on('pointerout', () => button.setColor('#00ffff'))
            .on('pointerdown', callback)

        return button
    }
}
