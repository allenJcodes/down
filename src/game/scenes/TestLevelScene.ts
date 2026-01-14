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
            const platform = platforms.create(x, y, null) as Phaser.Physics.Arcade.Sprite
            platform.setDisplaySize(200, 20)
            platform.setTint(0x2a2a2a)
            platform.refreshBody()
        }

        // Bottom platform (goal)
        const goalPlatform = platforms.create(width / 2, height - 50, null) as Phaser.Physics.Arcade.Sprite
        goalPlatform.setDisplaySize(300, 20)
        goalPlatform.setTint(0x44ff44)
        goalPlatform.refreshBody()

        // Create player
        this.player = new Player(this, 100, 100)
        this.physics.add.collider(this.player.sprite, platforms)

        // Goal zone
        const goalZone = this.add.zone(width / 2, height - 100, 300, 100)
        this.physics.world.enable(goalZone)

        this.physics.add.overlap(this.player.sprite, goalZone, () => {
            this.completeLevel()
        })
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
