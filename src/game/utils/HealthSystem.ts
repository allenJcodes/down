import Phaser from 'phaser'

export class HealthSystem {
    private scene: Phaser.Scene
    private maxHealth: number = 3
    private currentHealth: number = 3
    private hearts: Phaser.GameObjects.Graphics[] = []
    private invulnerable: boolean = false
    private invulnerabilityTime: number = 1000 // 1 second

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.createHearts()
    }

    private createHearts() {
        const startX = 20
        const startY = 20
        const spacing = 40

        for (let i = 0; i < this.maxHealth; i++) {
            const heart = this.createHeart(startX + i * spacing, startY)
            this.hearts.push(heart)
        }
    }

    private createHeart(x: number, y: number): Phaser.GameObjects.Graphics {
        const heart = this.scene.add.graphics()
        heart.setScrollFactor(0) // Keep hearts fixed on screen
        this.drawHeart(heart, x, y, 0xff4444) // Red heart
        return heart
    }

    private drawHeart(graphics: Phaser.GameObjects.Graphics, x: number, y: number, color: number) {
        graphics.clear()
        graphics.fillStyle(color, 1)

        // Draw heart shape using circles and a triangle
        const size = 12

        // Left circle
        graphics.fillCircle(x - size * 0.3, y - size * 0.2, size * 0.4)

        // Right circle
        graphics.fillCircle(x + size * 0.3, y - size * 0.2, size * 0.4)

        // Bottom triangle
        graphics.fillTriangle(
            x - size * 0.6, y - size * 0.1,  // Left point
            x + size * 0.6, y - size * 0.1,  // Right point
            x, y + size * 0.7                // Bottom point
        )
    }

    takeDamage(): boolean {
        if (this.invulnerable || this.currentHealth <= 0) {
            return false
        }

        this.currentHealth--
        this.updateHearts()

        // Set invulnerability
        this.invulnerable = true
        this.scene.time.delayedCall(this.invulnerabilityTime, () => {
            this.invulnerable = false
        })

        return true
    }

    private updateHearts() {
        for (let i = 0; i < this.maxHealth; i++) {
            const heart = this.hearts[i]
            const x = 20 + i * 40
            const y = 20

            if (i < this.currentHealth) {
                // Full heart (red)
                this.drawHeart(heart, x, y, 0xff4444)
            } else {
                // Empty heart (gray)
                this.drawHeart(heart, x, y, 0x666666)
            }
        }
    }

    heal(amount: number = 1) {
        this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth)
        this.updateHearts()
    }

    reset() {
        this.currentHealth = this.maxHealth
        this.invulnerable = false
        this.updateHearts()
    }

    getCurrentHealth(): number {
        return this.currentHealth
    }

    getMaxHealth(): number {
        return this.maxHealth
    }

    isInvulnerable(): boolean {
        return this.invulnerable
    }

    isDead(): boolean {
        return this.currentHealth <= 0
    }

    destroy() {
        this.hearts.forEach(heart => heart.destroy())
        this.hearts = []
    }
}
