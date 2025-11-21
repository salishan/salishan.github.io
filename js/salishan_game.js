import { getPrefix } from './head.js'
import keyboard from './keyboard.js'

const letters = keyboard
const normalize = str => str.normalize('NFC')

customElements.define(
	getPrefix('game'),
	class extends HTMLElement {
		#data = {
			currentLetter: undefined,
			points: undefined,
			skipped: undefined,
			seconds: undefined,
			input: undefined,
			target: undefined,
			targetDescription: undefined,
			secondsElement: undefined,
			pointsElement: undefined,
			skippedElement: undefined,
			interval: undefined,
		}

		#template = `
	<salishan-navbar></salishan-navbar>
    <nn-caja padding="1rem" max-width="1000px">
      <main>

			<section class="home" data-hidden="true">
				<div>
					<h1>Glyph Arena</h1>
					<p>A fast-paced educational game where players match unique glyphs from Salishan and other Indigenous languages.</p>
					<p>Type the displayed glyph correctly to earn points, or press Escape to skip it. The game help players practice reading and typing complex characters while testing their knowledge and reflexes.</p>
				</div>

				<nn-fila class="menu">
					<nn-btn color="#3fe383ff" class="goto-game">
						Start Game
					</nn-btn>
					<nn-btn color="#3fe383ff" class="goto-score">
						Check Scoreboard
					</nn-btn>
				</nn-fila>
			</section>

			<section class="form" data-hidden="false">
				<h2>Submit your score</h2>

				<nn-fila class="menu">
					<input id="name" type="text" placeholder="name" autocomplete="off" autocorrect="off" spellcheck="false" />
					<nn-btn color="#3fe383ff" id="submit-score">
						Submit Score
					</nn-btn>
					<nn-btn color="#3fe383ff" class="goto-score">
						Dismiss Score
					</nn-btn>
				</nn-fila>
			</section>

			<section class="scoreboard" data-hidden="true">
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
					<nn-btn color="#3fe383ff" class="goto-home">
						Go Back Home
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

				<div class="menu">
					<nn-btn color="#3fe383ff" class="new-game">
						Reset Challenge
					</nn-btn>
					<nn-btn color="#3fe383ff" class="goto-home">
						Quit Challenge
					</nn-btn>
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

		#show(section) {
			const all = this.querySelectorAll('section')
			all.forEach(s => (s.dataset.hidden = 'true'))

			const target = this.querySelector(`section.${section}`)
			if (target) target.dataset.hidden = 'false'
		}

		#resetGame() {
			letters.sort(() => 0.5 - Math.random())

			clearInterval(this.#data.interval)
			this.#data.interval = undefined

			this.#data.currentLetter = undefined
			this.#data.points = undefined
			this.#data.skipped = undefined
			this.#data.seconds = undefined

			if (this.#data.input) this.#data.input.disabled = true
			if (this.#data.secondsElement) this.#data.secondsElement.innerHTML = 0
			if (this.#data.pointsElement) this.#data.pointsElement.innerHTML = 0
			if (this.#data.skippedElement) this.#data.skippedElement.innerHTML = 0
			if (this.#data.target) this.#data.target.innerHTML = ''
			if (this.#data.targetDescription) this.#data.targetDescription.innerHTML = ''
			if (this.#data.input) this.#data.input.value = ''
		}

		#finishGame() {
			this.#resetGame()
			this.#show('form')
		}

		#saveScore() {
			const name = this.querySelector('#name').value.trim() || 'Unknown'

			const entry = {
				name,
				matched: this.#data.points,
				skipped: this.#data.skipped,
				time: this.#data.seconds,
				date: Date.now(),
			}

			const list = JSON.parse(localStorage.getItem('glyph-arena-scores') || '[]')
			list.push(entry)
			localStorage.setItem('glyph-arena-scores', JSON.stringify(list))
		}

		#loadScoreboard() {
			const body = this.querySelector('.table-body')
			body.innerHTML = ''

			const list = JSON.parse(localStorage.getItem('glyph-arena-scores') || '[]')

			list.sort((a, b) => {
				// Sort by points DESC
				if (b.matched !== a.matched) {
					return b.matched - a.matched
				}

				// If points are equal, sort by time ASC
				return a.time - b.time
			})

			if (list.length > 0) {
				list.slice(0, 50).forEach(entry => {
					const row = document.createElement('nn-fila')
					row.setAttribute('break', 'sm')
					row.setAttribute('gap', '.25rem')
					row.setAttribute('role', 'row')

					row.innerHTML = `
							<nn-pilar size="100% / 4 - 0.25rem" role="cell">${entry.name}</nn-pilar>
							<nn-pilar size="100% / 4 - 0.25rem" role="cell">${entry.matched}</nn-pilar>
							<nn-pilar size="100% / 4 - 0.25rem" role="cell">${entry.skipped}</nn-pilar>
							<nn-pilar size="100% / 4 - 0.25rem" role="cell">${entry.time}s</nn-pilar>
					`

					body.appendChild(row)
				})
			} else {
				const row = document.createElement('nn-fila')
				row.setAttribute('break', 'sm')
				row.setAttribute('role', 'row')

				row.innerHTML = `
							<nn-pilar size="100%" role="cell">No entries</nn-pilar>
					`
				body.appendChild(row)
			}
		}

		#handleKeydown = e => {
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

		#startNewGame() {
			this.#data.currentLetter = 0
			this.#data.points = 0
			this.#data.skipped = 0
			this.#data.seconds = 0

			if (this.#data.input) {
				this.#data.input.disabled = false
				this.#data.input.value = ''
				this.#data.input.focus()
			}

			clearInterval(this.#data.interval)
			this.#data.interval = undefined

			if (this.#data.secondsElement) this.#data.secondsElement.innerHTML = 0

			this.#updateDOM()
			this.#startTimer()
		}

		connectedCallback() {
			this.innerHTML = this.#template

			// Query elements
			this.#data.input = this.querySelector('.card.input input')
			this.#data.target = this.querySelector('.card.target .input')
			this.#data.targetDescription = this.querySelector('.card.target .description')
			this.#data.secondsElement = this.querySelector('.score .time')
			this.#data.pointsElement = this.querySelector('.score .points')
			this.#data.skippedElement = this.querySelector('.score .skipped')

			// Go to Game
			this.querySelectorAll('.goto-game').forEach(btn =>
				btn.addEventListener('click', () => {
					this.#startNewGame()
					this.#show('game')
				})
			)

			// Go to Scoreboard
			this.querySelectorAll('.goto-score').forEach(btn =>
				btn.addEventListener('click', () => {
					this.#loadScoreboard()
					this.#show('scoreboard')
				})
			)

			// Go Home
			this.querySelectorAll('.goto-home').forEach(btn =>
				btn.addEventListener('click', () => {
					this.#resetGame()
					this.#show('home')
				})
			)

			// Reset Challenge
			this.querySelectorAll('.new-game').forEach(btn =>
				btn.addEventListener('click', () => {
					this.#resetGame()
					this.#startNewGame()
				})
			)

			this.querySelector('#submit-score').addEventListener('click', () => {
				this.#saveScore()
				this.#loadScoreboard()
				this.#show('scoreboard')
			})

			// Start on homepage
			this.#show('home')

			document.addEventListener('keydown', this.#handleKeydown)
		}

		disconnectedCallback() {
			document.removeEventListener('keydown', this.#handleKeydown)
			clearInterval(this.#data.interval)
		}
	}
)
