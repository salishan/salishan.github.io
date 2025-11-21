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
				<p class="hint">(press <strong>esc</strong> to skip a letter)</p>
			</div>

			<div class="cards">

			<div class="card input">
				<input type="text" class="input" placeholder="-" autofocus />
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
				<span>Skipped:</span>	
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
		}

		#matchInputandTarget(e) {
			this.#startTimer()

			const hasMatch = normalize(e.target.value) === normalize(this.#data.target.innerHTML)

			if (hasMatch) {
				this.#data.points++
				this.#data.currentLetter++
				e.target.value = ''
				this.#updateDOM()

				if (this.#data.points + this.#data.skipped >= letters.length) this.#finishGame()
			}
		}

		#finishGame() {
			console.log('scored')
			clearInterval(this.#data.interval)
		}

		#handleKeydown = e => {
			this.#startTimer()

			if (e.key === 'Escape') {
				if (this.#data.points + this.#data.skipped >= letters.length) {
					this.#finishGame()
				} else {
					this.#data.skipped++
					this.#data.currentLetter++
					this.#updateDOM()
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

			this.#data.input.addEventListener('input', this.#matchInputandTarget.bind(this))
			document.addEventListener('keydown', this.#handleKeydown)
		}

		disconnectedCallback() {
			document.removeEventListener('keydown', this.#handleKeydown)
			clearInterval(this.#data.interval)
		}
	}
)
