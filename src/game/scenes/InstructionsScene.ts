import Phaser from 'phaser'

export class InstructionsScene extends Phaser.Scene {
    private playerName: string = ''
    private nameText!: Phaser.GameObjects.Text
    private inputElement: HTMLInputElement | null = null

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

        // Remove ALL existing name inputs to prevent duplicates
        const existingInputs = document.querySelectorAll('#name-input')
        existingInputs.forEach(input => {
            if (input.parentElement) {
                input.parentElement.removeChild(input)
            }
        })

        // Get the game canvas element to position input relative to it
        const canvas = this.game.canvas
        const canvasRect = canvas.getBoundingClientRect()

        this.inputElement = document.createElement('input')
        this.inputElement.id = 'name-input'
        this.inputElement.type = 'text'
        this.inputElement.maxLength = 20
        this.inputElement.placeholder = ''
        this.inputElement.style.position = 'absolute'
        this.inputElement.style.left = `${canvasRect.left + width / 2 - 100}px`
        this.inputElement.style.top = `${canvasRect.top + height / 2 - 50}px`
        this.inputElement.style.width = '200px'
        this.inputElement.style.padding = '10px'
        this.inputElement.style.fontSize = '24px'
        this.inputElement.style.textAlign = 'center'
        this.inputElement.style.backgroundColor = '#000000'
        this.inputElement.style.color = '#ffffff'
        this.inputElement.style.border = 'none'
        this.inputElement.style.outline = 'none'
        this.inputElement.style.borderBottom = '2px solid #ffffff'
        this.inputElement.style.zIndex = '1000'

        document.body.appendChild(this.inputElement)
        this.inputElement.focus()

        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.inputElement && this.inputElement.value.trim()) {
                this.submitName()
            }
        })
    }

    private submitName() {
        if (!this.inputElement) return

        this.playerName = this.inputElement.value.trim()

        if (this.playerName) {
            // Store name globally
            this.registry.set('playerName', this.playerName)

            // Remove input
            if (this.inputElement.parentElement) {
                this.inputElement.parentElement.removeChild(this.inputElement)
            }
            this.inputElement = null

            // Start tutorial directly
            this.scene.start('TutorialRoom1Scene')
        }
    }

    shutdown() {
        // Clean up input element when scene shuts down
        if (this.inputElement && this.inputElement.parentElement) {
            this.inputElement.parentElement.removeChild(this.inputElement)
            this.inputElement = null
        }
    }
}
