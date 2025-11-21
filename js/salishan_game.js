import { getPrefix } from './head.js'
import keyboard from './keyboard.js'

const letters = keyboard.sort(() => 0.5 - Math.random())
const normalize = str => str.normalize('NFC')

customElements.define(
	getPrefix('game'),
	class extends HTMLElement {
		#data = {
			currentLetter: 0,
			points: 0,
			skipped: 0,
			seconds: 0,
			input: null,
			target: null,
			targetDescription: null,
			interval: null,
		}

		#template = `
	<salishan-navbar></salishan-navbar>
    <nn-caja padding="1rem">
      <main>
			<section class="home">
				<h1>Glyph Arena</h1>
			</section>

			<section class="game">
				<div class="content">
					<h2>Match the glyphs</h2>
					<p class="hint">(press <strong>enter</strong> to submit a glyph or <strong>esc</strong> to skip it)</p>
				</div>

				<div class="cards">
					<div class="card input">
						<input type="text" class="input" placeholder="-" autofocus  autocomplete="off" autocorrect="off" spellcheck="false" />
						<p class="description"></p>
					</div>
					<div class="card target">
						<p class="input">${letters[0].label}</p>
						<p class="description">${letters[0].description}</p>
					</div>
				</div>

				<div class="score">
					<span>Matched:</span>	
					<span class="points">0</span>
					<span>Failed/Skipped:</span>	
					<span class="skipped">0</span>
					<span>Total:</span>	
					<span class="total">${letters.length}</span>
					<span>Seconds:</span>
					<span class="time">0</span>
				</div>
			</section>
      </main>
    </nn-caja>
    <salishan-footer></salishan-footer>
`

		#updateDOM() {
			this.#data.pointsElement.innerHTML = this.#data.points
			this.#data.skippedElement.innerHTML = this.#data.skipped
			this.#data.target.innerHTML = letters[this.#data.currentLetter]?.label || ''
			this.#data.targetDescription.innerHTML = letters[this.#data.currentLetter]?.description || ''
			this.#data.input.value = ''
		}

		#finishGame() {
			clearInterval(this.#data.interval)
			this.#data.input.disabled = true
			console.log('Game finished! Matched:', this.#data.points, 'Skipped:', this.#data.skipped)
		}

		#handleKeydown = e => {
			this.#startTimer()

			if (this.#data.points + this.#data.skipped >= letters.length) {
				this.#finishGame()
				return
			}

			if (e.key === 'Escape') {
				this.#data.skipped++
				this.#data.currentLetter++
				this.#updateDOM()
				return
			}

			if (e.key === 'Enter') {
				const inputValue = normalize(this.#data.input.value)
				const targetValue = normalize(letters[this.#data.currentLetter]?.label || '')

				if (inputValue === targetValue) {
					this.#data.points++
				} else {
					this.#data.skipped++
				}

				this.#data.currentLetter++
				this.#updateDOM()

				if (this.#data.points + this.#data.skipped >= letters.length) {
					this.#finishGame()
				}
			}
		}

		#startTimer() {
			if (!this.#data.interval) {
				this.#data.interval = setInterval(() => {
					this.#data.seconds++
					this.#data.secondsElement.innerHTML = this.#data.seconds
				}, 1000)
			}
		}

		connectedCallback() {
			this.innerHTML = this.#template

			this.#data.input = this.querySelector('.card.input input')
			this.#data.target = this.querySelector('.card.target .input')
			this.#data.targetDescription = this.querySelector('.card.target .description')
			this.#data.secondsElement = this.querySelector('.score .time')
			this.#data.pointsElement = this.querySelector('.score .points')
			this.#data.skippedElement = this.querySelector('.score .skipped')

			document.addEventListener('keydown', this.#handleKeydown)
		}

		disconnectedCallback() {
			document.removeEventListener('keydown', this.#handleKeydown)
			clearInterval(this.#data.interval)
		}
	}
)
