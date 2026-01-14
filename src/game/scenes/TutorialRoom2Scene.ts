import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { HealthSystem } from '../utils/HealthSystem'

export class TutorialRoom2Scene extends Phaser.Scene {
    private player!: Player
    private platforms!: Phaser.Physics.Arcade.StaticGroup
    private spikes!: Phaser.Physics.Arcade.StaticGroup
    private healthSystem!: HealthSystem

    constructor() {
        super({ key: 'TutorialRoom2Scene' })
    }

    create() {
        const { width, height } = this.cameras.main

        // Initialize health system
        this.healthSystem = new HealthSystem(this)

        // Tutorial text
        this.add.text(width / 2, 30, 'Obstacles Tutorial', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 70, 'RED SPIKES are dangerous!', {
            fontSize: '18px',
            color: '#ff4444',
        }).setOrigin(0.5)

        this.add.text(width / 2, 95, 'Avoid touching them or take damage', {
            fontSize: '14px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 120, 'Jump over them to reach the exit →', {
            fontSize: '16px',
            color: '#44ff44',
        }).setOrigin(0.5)

        // Create platforms
        this.platforms = this.physics.add.staticGroup()

        // Ground platform at the bottom
        const ground = this.platforms.create(width / 2, height - 10, undefined) as Phaser.Physics.Arcade.Sprite
        ground.setDisplaySize(width, 20)
        ground.setTint(0x2a2a2a)
        ground.refreshBody()

        // Create spikes group
        this.spikes = this.physics.add.staticGroup()

        // Single spike (positioned on ground - base at height - 20, which is top of platform)
        this.createSpike(200, height - 20, 1)
        this.add.text(200, height - 80, 'Single', {
            fontSize: '12px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Double spike (positioned on ground)
        this.createSpike(350, height - 20, 2)
        this.add.text(350, height - 80, 'Double', {
            fontSize: '12px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Triple spike (positioned on ground)
        this.createSpike(500, height - 20, 3)
        this.add.text(500, height - 80, 'Triple', {
            fontSize: '12px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Create player
        this.player = new Player(this, 50, height - 100)

        // Collisions
        this.physics.add.collider(this.player.sprite, this.platforms)

        // Spike collision (damage on touch)
        this.physics.add.overlap(this.player.sprite, this.spikes, (player, spike) => {
            this.handleSpikeDamage()
        })

        // Exit trigger on the right side of the ground
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
                console.log('Exit triggered!')
                this.scene.start('TutorialRoom3Scene')
            },
            undefined,
            this
        )
    }

    private createSpike(x: number, y: number, count: 1 | 2 | 3) {
        const spikeWidth = 20
        const spikeHeight = 30
        const spacing = 0 // No gap between spikes

        for (let i = 0; i < count; i++) {
            const offsetX = (i - (count - 1) / 2) * (spikeWidth + spacing)

            // Create spike using graphics
            const graphics = this.add.graphics()
            graphics.fillStyle(0xff4444, 1)

            // Draw upward-pointing triangle
            graphics.beginPath()
            graphics.moveTo(x + offsetX - spikeWidth / 2, y) // Bottom left
            graphics.lineTo(x + offsetX + spikeWidth / 2, y) // Bottom right
            graphics.lineTo(x + offsetX, y - spikeHeight) // Top point
            graphics.closePath()
            graphics.fillPath()

            // Create physics body for the spike
            const spike = this.spikes.create(x + offsetX, y - spikeHeight / 2, undefined) as Phaser.Physics.Arcade.Sprite
            spike.setDisplaySize(spikeWidth, spikeHeight)
            spike.setTint(0xff4444)
            spike.setAlpha(0) // Make the sprite invisible, we use the graphics instead
            spike.refreshBody()
        }
    }

    private handleSpikeDamage() {
        // Use health system to handle damage
        const damageTaken = this.healthSystem.takeDamage()

        if (damageTaken) {
            console.log(`Player hit spike! Health: ${this.healthSystem.getCurrentHealth()}/${this.healthSystem.getMaxHealth()}`)

            // Visual feedback - flash the player
            this.player.sprite.setTint(0xff0000)
            this.time.delayedCall(200, () => {
                this.player.sprite.setTint(0x4a9eff)
            })

            // Check if player died
            if (this.healthSystem.isDead()) {
                this.handleDeath()
            }
        }
    }

    private handleDeath() {
        console.log('Player died! Restarting scene...')
        this.time.delayedCall(1000, () => {
            this.scene.restart()
        })
    }

    update() {
        this.player.update()
    }
}
