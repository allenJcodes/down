import Phaser from 'phaser'
import { Player } from '../entities/Player'

export class TutorialRoom2Scene extends Phaser.Scene {
    private player!: Player

    constructor() {
        super({ key: 'TutorialRoom2Scene' })
    }

    create() {
        const { width, height } = this.cameras.main

        this.add.text(width / 2, 30, 'Obstacles Tutorial', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Create platforms and obstacles
        const platforms = this.physics.add.staticGroup()

        // Main platform
        const mainPlatform = platforms.create(width / 2, height - 50, null) as Phaser.Physics.Arcade.Sprite
        mainPlatform.setDisplaySize(700, 20)
        mainPlatform.setTint(0x2a2a2a)
        mainPlatform.refreshBody()

        // Create player
        this.player = new Player(this, 100, height - 150)
        this.physics.add.collider(this.player.sprite, platforms)

        // Placeholder for obstacles (to be implemented)
        this.add.text(width / 2, height / 2, 'Obstacles coming soon...', {
            fontSize: '18px',
            color: '#ffff00',
        }).setOrigin(0.5)

        // Exit trigger
        const exitZone = this.add.zone(width - 50, height - 100, 100, 200)
        this.physics.world.enable(exitZone)

        this.physics.add.overlap(this.player.sprite, exitZone, () => {
            this.scene.start('TutorialRoom3Scene')
        })
    }

    update() {
        this.player.update()
    }
}
