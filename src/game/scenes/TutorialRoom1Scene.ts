import Phaser from 'phaser'
import { Player } from '../entities/Player'

export class TutorialRoom1Scene extends Phaser.Scene {
    private player!: Player
    private platforms!: Phaser.Physics.Arcade.StaticGroup

    constructor() {
        super({ key: 'TutorialRoom1Scene' })
    }

    create() {
        const { width, height } = this.cameras.main

        // Tutorial text
        this.add.text(width / 2, 50, 'Welcome to DOWN!', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 90, 'Use W/↑/Space to JUMP', {
            fontSize: '16px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 115, 'Use A/← and D/→ to MOVE', {
            fontSize: '16px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 140, 'Use S/↓ to DROP FASTER', {
            fontSize: '16px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 175, 'Move right to continue →', {
            fontSize: '18px',
            color: '#44ff44',
        }).setOrigin(0.5)

        // Create platform
        this.platforms = this.physics.add.staticGroup()
        const platform = this.platforms.create(width / 2, height / 2 + 100, null) as Phaser.Physics.Arcade.Sprite
        platform.setDisplaySize(400, 20)
        platform.setTint(0x2a2a2a)
        platform.refreshBody()

        // Create player
        this.player = new Player(this, 200, height / 2)

        // Collision
        this.physics.add.collider(this.player.sprite, this.platforms)

        // Exit trigger
        const exitZone = this.add.zone(width - 50, height / 2, 100, 400)
        this.physics.world.enable(exitZone)

        this.physics.add.overlap(this.player.sprite, exitZone, () => {
            this.scene.start('TutorialRoom2Scene')
        })
    }

    update() {
        this.player.update()
    }
}
