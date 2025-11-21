import { getPrefix } from './head.js'

const letters = [
	{
		label: 'cʼ',
		description: 'letter c + glottalization',
	},
	{
		label: 'čʼ',
		description: 'letter c + caron + glottalization',
	},
	{
		label: 'qʼʷ',
		description: 'letter q + comma above + labialization',
	},
	{
		label: 'ɬ',
		description: 'letter l with belt',
	},
	{
		label: 'ɫ',
		description: 'letter l with tilde',
	},
	{
		label: 'Ⱥ',
		description: 'letter capital a with stroke',
	},
	{
		label: 'ʔ',
		description: 'glottal stop',
	},
	{
		label: 'Ɂ',
		description: 'capital glottal stop',
	},
	{
		label: 'θ',
		description: 'letter theta',
	},
	{
		label: 'ɛ',
		description: 'letter epsilon',
	},
	{
		label: 'χ',
		description: 'letter chi',
	},
	{
		label: 'Ŧ',
		description: 'letter capital t with stroke',
	},
	{
		label: 'ɣ',
		description: 'letter gamma',
	},
	{
		label: 'ʕ',
		description: 'reverse glottal stop',
	},
	{
		label: 'ɨ',
		description: 'letter i with stroke',
	},
	{
		label: 'ɯ',
		description: 'letter turned m',
	},
	{
		label: 'ʃ',
		description: 'letter esh',
	},
	{
		label: 'ɢ',
		description: 'letter small capital g',
	},
	{
		label: 'ə',
		description: 'letter schwa',
	},
	{
		label: 'ɩ',
		description: 'letter iota',
	},
	{
		label: 'ƛ',
		description: 'letter lambda with stroke',
	},
	{
		label: 'ʦ',
		description: 'letter ts',
	},
	{
		label: 'ʧ',
		description: 'letter tesh',
	},
].sort((a, b) => 0.5 - Math.random())

customElements.define(
	getPrefix('game'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#data = {
			currentLetter: 0,
			points: undefined,
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
        <section class="game">
			<div class="card input">
				<input type="text" class="input" placeholder="-" />
				<p class="description"></p>
			</div>
			<div class="card target">
				<p class="input">${
					letters[this.#data.currentLetter].label
				}</p>
				<p class="description">${
					letters[this.#data.currentLetter].description
				}</p>
			</div>
		</section>
		<div class="score">
			<span>Points:</span>	
			<span class="points">
				${this.#data.points || 0}
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
			const hasMatch =
				e.target.value === this.#data.target.innerHTML

			if (hasMatch) {
				++this.#data.currentLetter

				e.target.value = ''

				this.#data.target.innerHTML =
					letters[this.#data.currentLetter]?.label || ''
				this.#data.targetDescription.innerHTML =
					letters[this.#data.currentLetter]?.description ||
					''

				this.#data.points.innerHTML = ++this.#data.points
					.innerHTML

				if (
					++this.#data.points.innerHTML >= letters.length
				) {
					clearInterval(this.#data.interval)
				}
			}
		}

		async connectedCallback() {
			this.innerHTML = this.#template

			this.#data.input = this.querySelector(
				'.card.input input'
			)
			this.#data.target = this.querySelector(
				'.card.target .input'
			)
			this.#data.targetDescription = this.querySelector(
				'.card.target .description'
			)
			this.#data.seconds =
				this.querySelector('.score .time')
			this.#data.points = this.querySelector(
				'.score .points'
			)

			this.#data.interval = setInterval(() => {
				this.#data.seconds.innerHTML = ++this.#data.seconds
					.innerHTML
			}, 1000)

			this.#data.input.addEventListener(
				'input',
				this.#matchInputandTarget.bind(this)
			)
		}
	}
)
