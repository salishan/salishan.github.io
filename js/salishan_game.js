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
    <nn-caja padding="1rem" max-width="900px">
      <main>

			<section class="home flex-column" data-hidden="true">
				<h1>Glyph Arena</h1>

				<p>A fast-paced educational game where players match unique glyphs from Salishan and other Indigenous languages. Type the displayed glyph correctly to earn points, or press Escape to skip it. The game help players practice reading and typing complex characters while testing their knowledge and reflexes.</p>

				<nn-fila class="flex-column menu">
					<nn-btn color="#3fe383ff" id="goto-game">
						Start Game
					</nn-btn>
					<nn-btn color="#3fe383ff" id="goto-score">
						Check Scoreboard
					</nn-btn>
				</nn-fila>
			</section>

			<section class="form flex-column" data-hidden="false">
				<h2>Submit your score</h2>

				<nn-fila class="flex-column menu">
					<input id="name" type="text" placeholder="name" autocomplete="off" autocorrect="off" spellcheck="false" />
					<nn-btn color="#3fe383ff" id="submit-score">
						Submit
					</nn-btn>
				</nn-fila>
			</section>

			<section class="scoreboard flex-column" data-hidden="true">
				<h2>Scoreboard</h2>

				<div class="table" role="table">
					<nn-fila break="sm" class="table-header" gap=".25rem" role="row">
						<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
							Name
						</nn-pilar>
						<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
							Matched
						</nn-pilar>
						<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
							Failed / Skipped
						</nn-pilar>
						<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
							Time
						</nn-pilar>
					</nn-fila>
					<div class="table-body" role="rowgroup">
						<nn-fila break="sm" gap=".25rem" role="row">
							<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
								1
							</nn-pilar>
							<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
								2
							</nn-pilar>
							<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
								3
							</nn-pilar>
							<nn-pilar role="columnheader" size="100% / 4 - 0.25rem">
								4
							</nn-pilar>
						</nn-fila>
					</div>
				</div>
				
				<div class="menu">
					<nn-btn color="#3fe383ff" id="goto-home">
						Go Home
					</nn-btn>
				</div>
			</section>

			<section class="game" data-hidden="true">
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

					if (this.#data.seconds >= 120) {
						this.#finishGame()
					}
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
