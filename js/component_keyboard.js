import { getPrefix } from './head.js'

customElements.define(
	getPrefix('keyboard'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#keyboard = [
			// =========================
			// Number row
			// =========================
			{ tooltip: null, chars: ['`', '~'] }, // TLDE
			{ tooltip: null, chars: ['1', '!'] }, // AE01
			{ tooltip: null, chars: ['2', '@'] }, // AE02
			{ tooltip: null, chars: ['3', '#'] }, // AE03
			{ tooltip: null, chars: ['4', '$'] }, // AE04
			{ tooltip: null, chars: ['5', '%'] }, // AE05
			{ tooltip: null, chars: ['6', '^'] }, // AE06
			{ tooltip: null, chars: ['7', '&'] }, // AE07
			{ tooltip: null, chars: ['8', '*'] }, // AE08
			{ tooltip: 'combining short stroke overlay', chars: ['9', '(', '‿'] }, // AE09 (‿)
			{ tooltip: 'middle dot', chars: ['0', ')', '·'] }, // AE10 (·)
			{ tooltip: null, chars: ['-', '_'] }, // AE11
			{ tooltip: null, chars: ['=', '+'] }, // AE12

			// =========================
			// Top letter row
			// =========================
			{ tooltip: 'letter theta', chars: ['q', 'Q', 'θ'] }, // AD01
			{ tooltip: 'labialization', chars: ['w', 'W', 'ʷ'] }, // AD02
			{ tooltip: 'letter epsilon', chars: ['e', 'E', 'ɛ'] }, // AD03
			{ tooltip: 'letter chi', chars: ['r', 'R', 'χ'] }, // AD04
			{ tooltip: 'letter capital T with stroke', chars: ['t', 'T', 'Ŧ'] }, // AD05
			{ tooltip: 'letter gamma', chars: ['y', 'Y', 'ɣ'] }, // AD06
			{ tooltip: 'reverse glottal stop', chars: ['u', 'U', 'ʕ'] }, // AD07
			{ tooltip: 'letter i with stroke', chars: ['i', 'I', 'ɨ'] }, // AD08
			{ tooltip: 'glottal stop', chars: ['o', 'O', 'ʔ', 'Ɂ'] }, // AD09 (primary: ʔ)
			{ tooltip: 'letter tf', chars: ['p', 'P', 'ʧ'] }, // AD10
			{ tooltip: 'eng letter', chars: ['[', '{', 'ŋ'] }, // AD11
			{ tooltip: null, chars: [']', '}'] }, // AD12

			// =========================
			// Home row
			// =========================
			{ tooltip: 'letter capital A with stroke', chars: ['a', 'A', 'Ⱥ'] }, // AC01
			{ tooltip: 'letter l with belt', chars: ['s', 'S', 'ɬ'] }, // AC02
			{ tooltip: 'letter l with tilde', chars: ['d', 'D', 'ɫ'] }, // AC03
			{ tooltip: 'letter esh', chars: ['f', 'F', 'ʃ'] }, // AC04
			{ tooltip: 'letter small capital G', chars: ['g', 'G', 'ɢ'] }, // AC05
			{ tooltip: 'schwa', chars: ['h', 'H', 'ə'] }, // AC06
			{ tooltip: 'letter iota', chars: ['j', 'J', 'ɩ'] }, // AC07
			{ tooltip: 'letter turned m', chars: ['k', 'K', 'ɯ'] }, // AC08
			{ tooltip: 'lambda with stroke', chars: ['l', 'L', 'ƛ'] }, // AC09
			{ tooltip: 'letter ts', chars: [';', ':', 'ʦ'] }, // AC10
			{
				tooltip: 'modifier apostrophe (glottalization)',
				chars: ["'", '"', 'ʼ'],
			}, // AC11

			{ tooltip: null, chars: ['\\', '|'] }, // BKSL

			// =========================
			// Bottom row (combining marks)
			// =========================
			{ tooltip: 'acute accent', chars: ['z', 'Z', '́'] }, // AB01
			{
				tooltip: 'combining comma above (glottalization)',
				chars: ['x', 'X', '̓'],
			}, // AB02
			{ tooltip: 'combining macron', chars: ['c', 'C', '̄'] }, // AB03
			{ tooltip: 'combining tilde', chars: ['v', 'V', '̃'] }, // AB04
			{ tooltip: 'combining caron', chars: ['b', 'B', '̌'] }, // AB05
			{ tooltip: 'combining short stroke overlay', chars: ['n', 'N', '̵'] }, // AB06
			{ tooltip: 'combining tilde overlay', chars: ['m', 'M', '̴'] }, // AB07
			{ tooltip: 'combining dot below', chars: [',', '<', '̣'] }, // AB08
			{ tooltip: 'combining reversed breve below', chars: ['.', '>', '̞'] }, // AB09
			{ tooltip: 'combining macron below', chars: ['/', '?', '̱'] }, // AB10
		]

		#generateKeys() {
			return this.#keyboard
				.map(key => {
					const chars = key.chars
						.map(char => {
							return `
						<span class="char">
							${char}
						</span>
					`
						})
						.join('')

					return `
				<div class="key" ${key.tooltip ? `data-tooltip="${key.tooltip}"` : ''}>
					${chars}
				</div>
			`
				})
				.join('')
		}

		#data = {
			template: `${this.#generateKeys()}`,
		}

		connectedCallback() {
			this.innerHTML = this.#data.template
		}
	}
)
