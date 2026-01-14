import Phaser from 'phaser'

export class Player {
    public sprite: Phaser.Physics.Arcade.Sprite
    private scene: Phaser.Scene
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private keys: {
        w: Phaser.Input.Keyboard.Key
        a: Phaser.Input.Keyboard.Key
        s: Phaser.Input.Keyboard.Key
        d: Phaser.Input.Keyboard.Key
        space: Phaser.Input.Keyboard.Key
    }

    // Movement constants
    private readonly WALK_SPEED = 200
    private readonly JUMP_VELOCITY = -400
    private readonly DROP_MULTIPLIER = 2.5
    private readonly MAX_FALL_VELOCITY = 800 // Cap to prevent clipping through platforms

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene

        // Create sprite (placeholder rectangle)
        this.sprite = scene.physics.add.sprite(x, y, '')
        this.sprite.setDisplaySize(32, 48)
        this.sprite.setTint(0x4a9eff)

        // Physics properties
        this.sprite.setCollideWorldBounds(true)
        this.sprite.setBounce(0)

        // Input setup
        this.cursors = scene.input.keyboard!.createCursorKeys()
        this.keys = {
            w: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        }
    }

    update() {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body

        // Horizontal movement
        if (this.keys.a.isDown || this.cursors.left.isDown) {
            this.sprite.setVelocityX(-this.WALK_SPEED)
        } else if (this.keys.d.isDown || this.cursors.right.isDown) {
            this.sprite.setVelocityX(this.WALK_SPEED)
        } else {
            this.sprite.setVelocityX(0)
        }

        // Jump
        if (
            (this.keys.w.isDown || this.cursors.up.isDown || this.keys.space.isDown) &&
            body.touching.down
        ) {
            this.sprite.setVelocityY(this.JUMP_VELOCITY)
        }

        // Fast fall / drop
        if (this.keys.s.isDown || this.cursors.down.isDown) {
            // Cancel upward momentum if jumping
            if (body.velocity.y < 0) {
                this.sprite.setVelocityY(0)
            }
            // Apply fast fall when falling
            else if (body.velocity.y > 0) {
                // Apply multiplier but cap at max velocity to prevent clipping
                const newVelocity = Math.min(
                    body.velocity.y * this.DROP_MULTIPLIER,
                    this.MAX_FALL_VELOCITY
                )
                this.sprite.setVelocityY(newVelocity)
            }
        }
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite
    }
}
