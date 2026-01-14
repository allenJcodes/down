import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { GroundEnemy } from '../entities/GroundEnemy'
import { FlyingEnemy } from '../entities/FlyingEnemy'
import { HealthSystem } from '../utils/HealthSystem'

export class TestLevelScene extends Phaser.Scene {
    private player!: Player
    private platforms!: Phaser.Physics.Arcade.StaticGroup
    private spikes!: Phaser.Physics.Arcade.StaticGroup
    private groundEnemies: GroundEnemy[] = []
    private flyingEnemies: FlyingEnemy[] = []
    private healthSystem!: HealthSystem
    private timerText!: Phaser.GameObjects.Text
    private startTime: number = 0
    private levelCompleted: boolean = false
    private timerRunning: boolean = true

    constructor() {
        super({ key: 'TestLevelScene' })
    }

    create() {
        const { width, height } = this.cameras.main

        // Initialize health system
        this.healthSystem = new HealthSystem(this)

        this.add.text(width / 2, 30, 'Test Level - Reach the Bottom!', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Timer display
        this.timerText = this.add.text(width - 150, 20, 'Time: 0.00s', {
            fontSize: '20px',
            color: '#00ffff',
        })
        this.timerText.setScrollFactor(0)

        this.startTime = this.time.now

        // Create platforms and spikes groups
        this.platforms = this.physics.add.staticGroup()
        this.spikes = this.physics.add.staticGroup()

        // Starting platform (top)
        this.createPlatform(100, 100, 150)

        // Level 1 - Jump right with spike
        this.createPlatform(400, 150, 150)
        this.createSpike(400, 150 - 10, 1)

        // Level 2 - Jump left with ground enemy
        this.createPlatform(150, 230, 180)
        const enemy1 = new GroundEnemy(this, 150, 230 - 40)
        this.groundEnemies.push(enemy1)
        this.physics.add.collider(enemy1.sprite, this.platforms)

        // Level 3 - Jump right with flying enemy
        this.createPlatform(500, 310, 150)
        const flyingEnemy1 = new FlyingEnemy(this, 350, 270)
        this.flyingEnemies.push(flyingEnemy1)

        // Level 4 - Jump left with double spikes
        this.createPlatform(200, 390, 200)
        this.createSpike(200, 390 - 10, 2)

        // Level 5 - Jump right with ground enemy and flying enemy
        this.createPlatform(550, 470, 180)
        const enemy2 = new GroundEnemy(this, 550, 470 - 40)
        this.groundEnemies.push(enemy2)
        this.physics.add.collider(enemy2.sprite, this.platforms)

        const flyingEnemy2 = new FlyingEnemy(this, 400, 450)
        this.flyingEnemies.push(flyingEnemy2)

        // Level 6 - Final jump left with triple spikes
        this.createPlatform(250, 550, 200)
        this.createSpike(250, 550 - 10, 3)

        // Ground platform at the bottom (full width)
        const ground = this.platforms.create(width / 2, height - 10, undefined) as Phaser.Physics.Arcade.Sprite
        ground.setDisplaySize(width, 20)
        ground.setTint(0x2a2a2a)
        ground.refreshBody()

        // Create player
        this.player = new Player(this, 100, 50)

        // Collisions
        this.physics.add.collider(this.player.sprite, this.platforms)

        // Spike collision
        this.physics.add.overlap(this.player.sprite, this.spikes, () => {
            this.handleSpikeDamage()
        })

        // Enemy collisions
        this.groundEnemies.forEach(enemy => {
            this.physics.add.overlap(this.player.sprite, enemy.sprite, () => {
                this.handleEnemyDamage()
            })
        })

        this.flyingEnemies.forEach(enemy => {
            this.physics.add.overlap(this.player.sprite, enemy.sprite, () => {
                this.handleEnemyDamage()
            })
        })

        // Exit zone on the lower right (can only be reached from ground)
        const exitZone = this.add.zone(width - 80, height - 60, 120, 120)
        this.physics.world.enable(exitZone)
        const exitBody = exitZone.body as Phaser.Physics.Arcade.Body
        exitBody.setAllowGravity(false)

        // Visual indicator for exit
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

        // Set camera to follow player
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1)
        this.cameras.main.setBounds(0, 0, width, height)
    }

    private createPlatform(x: number, y: number, width: number) {
        const platform = this.platforms.create(x, y, undefined) as Phaser.Physics.Arcade.Sprite
        platform.setDisplaySize(width, 20)
        platform.setTint(0x2a2a2a)
        platform.refreshBody()
    }

    private createSpike(x: number, y: number, count: 1 | 2 | 3) {
        const spikeWidth = 20
        const spikeHeight = 30
        const spacing = 0

        for (let i = 0; i < count; i++) {
            const offsetX = (i - (count - 1) / 2) * (spikeWidth + spacing)

            // Create spike using graphics
            const graphics = this.add.graphics()
            graphics.fillStyle(0xff4444, 1)

            // Draw upward-pointing triangle with base at y position
            graphics.beginPath()
            graphics.moveTo(x + offsetX - spikeWidth / 2, y)
            graphics.lineTo(x + offsetX + spikeWidth / 2, y)
            graphics.lineTo(x + offsetX, y - spikeHeight)
            graphics.closePath()
            graphics.fillPath()

            // Create physics body for the spike
            const spike = this.spikes.create(x + offsetX, y - spikeHeight / 2, undefined) as Phaser.Physics.Arcade.Sprite
            spike.setDisplaySize(spikeWidth, spikeHeight)
            spike.setTint(0xff4444)
            spike.setAlpha(0)
            spike.refreshBody()
        }
    }

    private handleSpikeDamage() {
        const damageTaken = this.healthSystem.takeDamage()

        if (damageTaken) {
            console.log(`Player hit spike! Health: ${this.healthSystem.getCurrentHealth()}/${this.healthSystem.getMaxHealth()}`)

            // Visual feedback
            this.player.sprite.setTint(0xff0000)
            this.time.delayedCall(200, () => {
                this.player.sprite.setTint(0x4a9eff)
            })

            if (this.healthSystem.isDead()) {
                this.handleDeath()
            }
        }
    }

    private handleEnemyDamage() {
        const damageTaken = this.healthSystem.takeDamage()

        if (damageTaken) {
            console.log(`Player hit enemy! Health: ${this.healthSystem.getCurrentHealth()}/${this.healthSystem.getMaxHealth()}`)

            // Visual feedback
            this.player.sprite.setTint(0xff0000)
            this.time.delayedCall(200, () => {
                this.player.sprite.setTint(0x4a9eff)
            })

            if (this.healthSystem.isDead()) {
                this.handleDeath()
            }
        }
    }

    private handleDeath() {
        console.log('Player died! Restarting level...')
        this.time.delayedCall(1000, () => {
            this.scene.restart()
        })
    }

    update() {
        this.player.update()

        // Update all enemies
        this.groundEnemies.forEach(enemy => enemy.update())
        this.flyingEnemies.forEach(enemy => enemy.update())

        // Update timer only if still running
        if (this.timerRunning) {
            const elapsed = (this.time.now - this.startTime) / 1000
            this.timerText.setText(`Time: ${elapsed.toFixed(2)}s`)
        }
    }

    private completeLevel() {
        if (this.levelCompleted) return // Prevent multiple triggers
        this.levelCompleted = true
        this.timerRunning = false // Stop the timer

        const finalTime = (this.time.now - this.startTime) / 1000
        console.log(`Level completed in ${finalTime.toFixed(2)}s`)
        console.log(`Health remaining: ${this.healthSystem.getCurrentHealth()}/${this.healthSystem.getMaxHealth()}`)

        // Show completion screen
        const completionText = this.add.text(400, 300, `Level Complete!\nTime: ${finalTime.toFixed(2)}s\nHealth: ${this.healthSystem.getCurrentHealth()}/3`, {
            fontSize: '32px',
            color: '#44ff44',
            align: 'center',
        }).setOrigin(0.5).setScrollFactor(0)

        // Add countdown text
        const countdownText = this.add.text(400, 380, 'Exiting stage in 5...', {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5).setScrollFactor(0)

        // Countdown timer
        let countdown = 5
        const countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                countdown--
                if (countdown > 0) {
                    countdownText.setText(`Exiting stage in ${countdown}...`)
                } else {
                    countdownText.setText('Exiting now!')
                    // Exit to main menu or restart
                    this.time.delayedCall(500, () => {
                        this.scene.restart()
                    })
                }
            },
            repeat: 4
        })
    }
}
