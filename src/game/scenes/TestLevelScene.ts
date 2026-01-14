import Phaser from 'phaser'
import { Player } from '../entities/Player'

export class TestLevelScene extends Phaser.Scene {
    private player!: Player
    private timerText!: Phaser.GameObjects.Text
    private startTime: number = 0

    constructor() {
        super({ key: 'TestLevelScene' })
    }

    create() {
        const { width, height } = this.cameras.main

        this.add.text(width / 2, 30, 'Test Level - Reach the Bottom!', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Timer display
        this.timerText = this.add.text(20, 20, 'Time: 0.00s', {
            fontSize: '20px',
            color: '#00ffff',
        })

        this.startTime = this.time.now

        // Create platforms
        const platforms = this.physics.add.staticGroup()

        // Multiple platforms for vertical descent
        for (let i = 0; i < 5; i++) {
            const x = 200 + (i % 2) * 400
            const y = 150 + i * 100
            const platform = platforms.create(x, y, undefined) as Phaser.Physics.Arcade.Sprite
            platform.setDisplaySize(200, 20)
            platform.setTint(0x2a2a2a)
            platform.refreshBody()
        }

        // Ground platform at the bottom (full width)
        const ground = platforms.create(width / 2, height - 10, undefined) as Phaser.Physics.Arcade.Sprite
        ground.setDisplaySize(width, 20)
        ground.setTint(0x2a2a2a)
        ground.refreshBody()

        // Create player
        this.player = new Player(this, 100, 100)
        this.physics.add.collider(this.player.sprite, platforms)

        // Exit zone on the lower right (same as tutorial rooms)
        const exitZone = this.add.zone(width - 80, height - 60, 120, 120)
        this.physics.world.enable(exitZone)
        const exitBody = exitZone.body as Phaser.Physics.Arcade.Body
        exitBody.setAllowGravity(false)

        // Visual indicator for exit (green glowing area)
        this.add.rectangle(width - 80, height - 60, 120, 120, 0x44ff44, 0.3)
        this.add.text(width - 80, height - 60, 'EXIT', {
            fontSize: '20px',
            color: '#44ff44',
            fontStyle: 'bold',
        }).setOrigin(0.5)

        this.physics.add.overlap(
            this.player.sprite,
            exitZone,
            () => {
                this.completeLevel()
            },
            undefined,
            this
        )
    }

    update() {
        this.player.update()

        // Update timer
        const elapsed = (this.time.now - this.startTime) / 1000
        this.timerText.setText(`Time: ${elapsed.toFixed(2)}s`)
    }

    private completeLevel() {
        const finalTime = (this.time.now - this.startTime) / 1000
        console.log(`Level completed in ${finalTime.toFixed(2)}s`)

        // Return to menu for now
        this.scene.start('MainMenuScene')
    }
}
