import { getPrefix } from './head.js'
import keyboard from './keyboard.js'

const letters = keyboard.sort(() => 0.5 - Math.random())

const normalize = str => str.normalize('NFC')

customElements.define(
	getPrefix('game'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#data = {
			currentLetter: 0,
			points: undefined,
			skipped: undefined,
			seconds: undefined,
			input: undefined,
			target: undefined,
			targetDescription: undefined,
			interval: undefined,
		}

		#template = `
	<salishan-navbar></salishan-navbar>

    <nn-caja padding="1rem">
      <main>
		<h1>Match the letters</h1>

        <section class="game">
			<div class="card input">
				<input type="text" class="input" placeholder="-" />
				<p class="description"></p>
			</div>
			<div class="card target">
				<p class="input">${letters[this.#data.currentLetter].label}</p>
				<p class="description">${letters[this.#data.currentLetter].description}</p>
			</div>
		</section>
		<div class="score">
			<span>Matched:</span>	
			<span class="points">
				${this.#data.points || 0}
			</span>

			<span>Skipped:</span>	
			<span class="skipped">
				${this.#data.skipped || 0}
			</span>

			<span>Total:</span>	
			<span class="total">
				${keyboard.length}
			</span>

			<span>Seconds:</span>
			<span class="time">
				${this.#data.seconds || 0}
			</span>
		</div>
      </main>
    </nn-caja>
    
    <salishan-footer></salishan-footer>
`

		#matchInputandTarget(e) {
			this.#startTimer()

			const hasMatch = normalize(e.target.value) === normalize(this.#data.target.innerHTML)

			if (hasMatch) {
				++this.#data.currentLetter

				e.target.value = ''

				this.#data.target.innerHTML = letters[this.#data.currentLetter]?.label || ''
				this.#data.targetDescription.innerHTML = letters[this.#data.currentLetter]?.description || ''

				this.#data.points.innerHTML = ++this.#data.points.innerHTML

				if (this.#data.points.innerHTML >= letters.length) {
					clearInterval(this.#data.interval)
				}
			}
		}

		#startTimer() {
			if (!this.#data.interval) {
				this.#data.interval = setInterval(() => {
					this.#data.seconds.innerHTML = ++this.#data.seconds.innerHTML
				}, 1000)
			}
		}

		async connectedCallback() {
			this.innerHTML = this.#template

			this.#data.input = this.querySelector('.card.input input')
			this.#data.target = this.querySelector('.card.target .input')
			this.#data.targetDescription = this.querySelector('.card.target .description')
			this.#data.seconds = this.querySelector('.score .time')
			this.#data.points = this.querySelector('.score .points')
			this.#data.skipped = this.querySelector('.score .skipped')

			this.#data.input.addEventListener('input', this.#matchInputandTarget.bind(this))
		}
	}
)
