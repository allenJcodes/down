import Phaser from 'phaser'

export class FlyingEnemy {
    public sprite: Phaser.Physics.Arcade.Sprite
    private scene: Phaser.Scene
    private speed: number = 60
    private direction: number = 1 // 1 = right, -1 = left
    private patrolDistance: number = 150
    private startX: number
    private minX: number
    private maxX: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.startX = x
        this.minX = x - this.patrolDistance / 2
        this.maxX = x + this.patrolDistance / 2

        // Create sprite (red circle for flying enemy)
        this.sprite = scene.physics.add.sprite(x, y, '')
        this.sprite.setDisplaySize(25, 25)
        this.sprite.setTint(0xff6666)

        // Physics properties - flying enemies ignore gravity
        this.sprite.body!.setAllowGravity(false)
        this.sprite.setCollideWorldBounds(true)
        this.sprite.setBounce(0)
        this.sprite.setVelocityX(this.speed * this.direction)
    }

    update() {
        // Check if reached patrol boundaries
        if (this.sprite.x <= this.minX && this.direction === -1) {
            // Reached left boundary, turn right
            this.direction = 1
            this.sprite.setVelocityX(this.speed * this.direction)
        } else if (this.sprite.x >= this.maxX && this.direction === 1) {
            // Reached right boundary, turn left
            this.direction = -1
            this.sprite.setVelocityX(this.speed * this.direction)
        }
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite
    }
}
