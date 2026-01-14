import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { GroundEnemy } from '../entities/GroundEnemy'
import { FlyingEnemy } from '../entities/FlyingEnemy'

export class TutorialRoom3Scene extends Phaser.Scene {
    private player!: Player
    private platforms!: Phaser.Physics.Arcade.StaticGroup
    private groundEnemies: GroundEnemy[] = []
    private flyingEnemies: FlyingEnemy[] = []

    constructor() {
        super({ key: 'TutorialRoom3Scene' })
    }

    create() {
        const { width, height } = this.cameras.main

        // Tutorial text
        this.add.text(width / 2, 30, 'Enemy Tutorial', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 70, 'ENEMIES will damage you on contact!', {
            fontSize: '16px',
            color: '#ff4444',
        }).setOrigin(0.5)

        this.add.text(width / 2, 95, 'GROUND ENEMIES patrol platforms', {
            fontSize: '14px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 115, 'FLYING ENEMIES move in patterns', {
            fontSize: '14px',
            color: '#00ffff',
        }).setOrigin(0.5)

        this.add.text(width / 2, 140, 'Avoid them to reach the exit →', {
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

        // Create player
        this.player = new Player(this, 50, height - 100)

        // Collision with platforms
        this.physics.add.collider(this.player.sprite, this.platforms)

        // Create ground enemies
        const groundEnemy1 = new GroundEnemy(this, 250, height - 50)
        this.groundEnemies.push(groundEnemy1)
        this.physics.add.collider(groundEnemy1.sprite, this.platforms)

        const groundEnemy2 = new GroundEnemy(this, 450, height - 50)
        this.groundEnemies.push(groundEnemy2)
        this.physics.add.collider(groundEnemy2.sprite, this.platforms)

        // Labels for ground enemies
        this.add.text(250, height - 100, 'Ground Enemy', {
            fontSize: '12px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Create flying enemies
        const flyingEnemy1 = new FlyingEnemy(this, 350, height - 200)
        this.flyingEnemies.push(flyingEnemy1)

        const flyingEnemy2 = new FlyingEnemy(this, 550, height - 150)
        this.flyingEnemies.push(flyingEnemy2)

        // Labels for flying enemies
        this.add.text(350, height - 240, 'Flying Enemy', {
            fontSize: '12px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Enemy collision with player
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
                this.scene.start('TestLevelScene')
            },
            undefined,
            this
        )
    }

    private handleEnemyDamage() {
        // For now, just log damage (health system to be implemented)
        console.log('Player hit enemy! Damage taken.')

        // Visual feedback - flash the player
        this.player.sprite.setTint(0xff0000)
        this.time.delayedCall(200, () => {
            this.player.sprite.setTint(0x4a9eff)
        })
    }

    update() {
        this.player.update()

        // Update all enemies
        this.groundEnemies.forEach(enemy => enemy.update())
        this.flyingEnemies.forEach(enemy => enemy.update())
    }
}
