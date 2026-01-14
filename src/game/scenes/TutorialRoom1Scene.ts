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

        // Create platforms
        this.platforms = this.physics.add.staticGroup()

        // Main platform in the middle
        const platform = this.platforms.create(width / 2, height / 2 + 100, undefined) as Phaser.Physics.Arcade.Sprite
        platform.setDisplaySize(400, 20)
        platform.setTint(0x2a2a2a)
        platform.refreshBody()

        // Ground platform at the bottom (safety net)
        const ground = this.platforms.create(width / 2, height - 10, undefined) as Phaser.Physics.Arcade.Sprite
        ground.setDisplaySize(width, 20)
        ground.setTint(0x2a2a2a)
        ground.refreshBody()

        // Create player
        this.player = new Player(this, 200, height / 2)

        // Collision
        this.physics.add.collider(this.player.sprite, this.platforms)

        // Exit trigger on the right side of the ground platform
        const exitZone = this.add.zone(width - 80, height - 60, 120, 120)
        this.physics.world.enable(exitZone)
        const exitBody = exitZone.body as Phaser.Physics.Arcade.Body
        exitBody.setAllowGravity(false)

        // Visual indicator for exit (green glowing area)
        const exitIndicator = this.add.rectangle(width - 80, height - 60, 120, 120, 0x44ff44, 0.3)
        this.add.text(width - 80, height - 60, 'EXIT', {
            fontSize: '20px',
            color: '#44ff44',
            fontStyle: 'bold',
        }).setOrigin(0.5)

        // Setup overlap detection
        this.physics.add.overlap(
            this.player.sprite,
            exitZone,
            () => {
                console.log('Exit triggered!')
                this.scene.start('TutorialRoom2Scene')
            },
            undefined,
            this
        )
    }

    update() {
        this.player.update()
    }
}
