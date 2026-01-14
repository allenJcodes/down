import Phaser from 'phaser'

export class InstructionsScene extends Phaser.Scene {
    private playerName: string = ''
    private nameText!: Phaser.GameObjects.Text
    private inputElement!: HTMLInputElement

    constructor() {
        super({ key: 'InstructionsScene' })
    }

    create() {
        const { width, height } = this.cameras.main

        // Prompt text
        this.add.text(width / 2, height / 2 - 100, 'Enter Player Name', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5)

        // Create HTML input element
        this.createNameInput()

        // Name display
        this.nameText = this.add.text(width / 2, height / 2, '', {
            fontSize: '24px',
            color: '#00ffff',
        }).setOrigin(0.5)
    }

    private createNameInput() {
        const { width, height } = this.cameras.main

        this.inputElement = document.createElement('input')
        this.inputElement.type = 'text'
        this.inputElement.maxLength = 20
        this.inputElement.placeholder = 'Your name...'
        this.inputElement.style.position = 'absolute'
        this.inputElement.style.left = `${width / 2 - 100}px`
        this.inputElement.style.top = `${height / 2 - 20}px`
        this.inputElement.style.width = '200px'
        this.inputElement.style.padding = '10px'
        this.inputElement.style.fontSize = '18px'
        this.inputElement.style.textAlign = 'center'

        document.body.appendChild(this.inputElement)
        this.inputElement.focus()

        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.inputElement.value.trim()) {
                this.submitName()
            }
        })
    }

    private submitName() {
        this.playerName = this.inputElement.value.trim()

        if (this.playerName) {
            // Store name globally
            this.registry.set('playerName', this.playerName)

            // Remove input
            document.body.removeChild(this.inputElement)

            // Show menu
            this.showMenu()
        }
    }

    private showMenu() {
        const { width, height } = this.cameras.main

        // Clear previous content
        this.children.removeAll()

        // Title
        this.add.text(width / 2, height / 2 - 150, 'DOWN', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold',
        }).setOrigin(0.5)

        // Menu buttons
        this.createButton(width / 2, height / 2 - 20, 'Play', () => {
            this.scene.start('TutorialRoom1Scene')
        })

        this.createButton(width / 2, height / 2 + 40, 'Leaderboards', () => {
            console.log('Leaderboards - Coming soon')
        })

        this.createButton(width / 2, height / 2 + 100, 'Options', () => {
            console.log('Options - Coming soon')
        })
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const button = this.add.text(x, y, text, {
            fontSize: '28px',
            color: '#00ffff',
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setColor('#ffffff'))
            .on('pointerout', () => button.setColor('#00ffff'))
            .on('pointerdown', callback)

        return button
    }
}
