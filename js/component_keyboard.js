import { getPrefix } from './head.js'

const reg = {
	spk: { value: 'spk', label: 'Spokane Salish' },
}

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
			{ reg: [], cat: 'top', tooltip: null, chars: ['`', '~'] }, // TLDE
			{ reg: [], cat: 'top', tooltip: null, chars: ['1', '!'] }, // AE01
			{ reg: [], cat: 'top', tooltip: null, chars: ['2', '@'] }, // AE02
			{ reg: [], cat: 'top', tooltip: null, chars: ['3', '#'] }, // AE03
			{ reg: [], cat: 'top', tooltip: null, chars: ['4', '$'] }, // AE04
			{ reg: [], cat: 'top', tooltip: null, chars: ['5', '%'] }, // AE05
			{ reg: [], cat: 'top', tooltip: null, chars: ['6', '^'] }, // AE06
			{ reg: [], cat: 'top', tooltip: null, chars: ['7', '&'] }, // AE07
			{ reg: [], cat: 'top', tooltip: null, chars: ['8', '*'] }, // AE08
			{ reg: [], cat: 'top', tooltip: 'undertie', chars: ['9', '(', '‿'] }, // AE09 (‿)
			{ reg: [], cat: 'top', tooltip: 'middle dot', chars: ['0', ')', '·'] }, // AE10 (·)
			{ reg: [], cat: 'top', tooltip: null, chars: ['-', '_'] }, // AE11
			{ reg: [], cat: 'top', tooltip: null, chars: ['=', '+'] }, // AE12
			{ reg: [], cat: 'blank', tooltip: null, chars: ['backspace'], size: 2 },

			// =========================
			// Top letter row
			// =========================
			{ reg: [], cat: 'blank', tooltip: null, chars: ['tab'], size: 2 },
			{ reg: [], cat: 'rest', tooltip: 'letter theta', chars: ['q', 'Q', 'θ'] }, // AD01
			{
				reg: [reg.spk],
				cat: 'rest',
				tooltip: 'modifier letter small w (labialization)',
				chars: ['w', 'W', 'ʷ'],
			}, // AD02
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter epsilon',
				chars: ['e', 'E', 'ɛ'],
			}, // AD03
			{ reg: [], cat: 'rest', tooltip: 'letter chi', chars: ['r', 'R', 'χ'] }, // AD04
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter capital T with stroke',
				chars: ['t', 'T', 'Ŧ'],
			}, // AD05
			{
				reg: [reg.spk],
				cat: 'rest',
				tooltip: 'letter gamma',
				chars: ['y', 'Y', 'ɣ'],
			}, // AD06
			{
				reg: [],
				cat: 'rest',
				tooltip: 'reverse glottal stop',
				chars: ['u', 'U', 'ʕ'],
			}, // AD07
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter i with stroke',
				chars: ['i', 'I', 'ɨ'],
			}, // AD08
			{
				reg: [reg.spk],
				cat: 'rest',
				tooltip: 'glottal stop',
				chars: ['o', 'O', 'ʔ', 'Ɂ'],
			}, // AD09 (primary: ʔ)
			{ reg: [], cat: 'rest', tooltip: 'letter tf', chars: ['p', 'P', 'ʧ'] }, // AD10
			{ reg: [], cat: 'rest', tooltip: 'eng letter', chars: ['[', '{', 'ŋ'] }, // AD11
			{ reg: [], cat: 'rest', tooltip: null, chars: [']', '}'] }, // AD12
			{ reg: [], cat: 'rest', tooltip: null, chars: ['\\', '|'] }, // BKSL

			// =========================
			// Home row
			// =========================
			{ reg: [], cat: 'blank', tooltip: null, chars: ['cap lock'], size: 2 },
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter capital A with stroke',
				chars: ['a', 'A', 'Ⱥ'],
			}, // AC01
			{
				reg: [reg.spk],
				cat: 'rest',
				tooltip: 'letter l with belt',
				chars: ['s', 'S', 'ɬ', 'ł'],
			}, // AC02
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter l with tilde',
				chars: ['d', 'D', 'ɫ'],
			}, // AC03
			{ reg: [], cat: 'rest', tooltip: 'letter esh', chars: ['f', 'F', 'ʃ'] }, // AC04
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter small capital G',
				chars: ['g', 'G', 'ɢ'],
			}, // AC05
			{ reg: [reg.spk], cat: 'rest', tooltip: 'schwa', chars: ['h', 'H', 'ə'] }, // AC06
			{ reg: [], cat: 'rest', tooltip: 'letter iota', chars: ['j', 'J', 'ɩ'] }, // AC07
			{
				reg: [],
				cat: 'rest',
				tooltip: 'letter turned m',
				chars: ['k', 'K', 'ɯ'],
			}, // AC08
			{
				reg: [reg.spk],
				cat: 'rest',
				tooltip: 'lambda with stroke',
				chars: ['l', 'L', 'ƛ'],
			}, // AC09
			{ reg: [], cat: 'rest', tooltip: 'letter ts', chars: [';', ':', 'ʦ'] }, // AC10
			{
				reg: [],
				cat: 'rest',
				tooltip: 'modifier apostrophe (glottalization)',
				chars: ["'", '"', 'ʼ'],
			}, // AC11
			{ reg: [], cat: 'blank', tooltip: null, chars: ['enter'], size: 2 },

			// =========================
			// Bottom row (combining marks)
			// =========================
			{
				reg: [],
				cat: 'special',
				tooltip: null,
				chars: ['left shift'],
				size: 2,
			},
			{
				reg: [reg.spk],
				cat: 'bottom',
				tooltip: 'acute accent',
				chars: ['z', 'Z', '́'],
			}, // AB01
			{
				reg: [reg.spk],
				cat: 'bottom',
				tooltip: 'combining comma above (glottalization)',
				chars: ['x', 'X', '̓'],
			}, // AB02
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'combining macron',
				chars: ['c', 'C', '̄'],
			}, // AB03
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'combining tilde',
				chars: ['v', 'V', '̃'],
			}, // AB04
			{
				reg: [reg.spk],
				cat: 'bottom',
				tooltip: 'combining caron',
				chars: ['b', 'B', '̌'],
			}, // AB05
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'combining short stroke overlay',
				chars: ['n', 'N', '̵'],
			}, // AB06
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'combining tilde overlay',
				chars: ['m', 'M', '̴'],
			}, // AB07
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'Combining Down Tack Below',
				chars: [',', '<', '̞'],
			}, // AB08
			{
				reg: [reg.spk],
				cat: 'bottom',
				tooltip: 'combining dot below',
				chars: ['.', '>', '̣'],
			}, // AB09
			{
				reg: [],
				cat: 'bottom',
				tooltip: 'combining macron below',
				chars: ['/', '?', '̱'],
			}, // AB10
			{
				reg: [],
				cat: 'special',
				tooltip: null,
				chars: ['right shift'],
				size: 3,
			},

			// special section
			{ reg: [], cat: 'blank', tooltip: null, chars: ['left ctrl'], size: 1 },
			{ reg: [], cat: 'blank', tooltip: null, chars: ['super'], size: 1 },
			{ reg: [], cat: 'blank', tooltip: null, chars: ['left alt'], size: 1 },
			{
				reg: [],
				cat: 'blank spacebar',
				tooltip: null,
				chars: ['spacebar'],
				size: 1,
			},
			{ reg: [], cat: 'special', tooltip: null, chars: ['right alt'], size: 1 },
			{ reg: [], cat: 'blank', tooltip: null, chars: ['right ctrl'], size: 1 },
		]

		#generateKeys() {
			const keys = this.#keyboard
				.map(key => {
					const chars = key.chars
						.map(c => `<span class="char">${c}</span>`)
						.join('')

					const keyRegions = key.reg?.map(r => r.value).join(' ') || ''

					const classes = [
						key.cat,
						keyRegions,
						!key.tooltip && 'empty-key',
						key.size && `wide-${key.size}`,
					]
						.filter(Boolean)
						.join(' ')

					const title = key.tooltip
						? `title="${key.tooltip.toUpperCase()}"`
						: ''

					return `<div class="key ${classes}" ${title}>${chars}</div>`
				})
				.join('')

			// const regions =
			// 	Object.entries(reg)
			// 		?.map(
			// 			([key, value]) =>
			// 				`<button type="button" class="btn ${key}">${value.label}</button>`
			// 		)
			// 		.join('') || ''

			return `<div class="keyboard">${keys}</div>`
		}
		// <h2>Languages Support</h2>

		// <div class="regions">${regions}</div>

		#data = {
			template: `${this.#generateKeys()}`,
		}

		connectedCallback() {
			this.innerHTML = this.#data.template

			// const regionButtons = this.querySelectorAll('.regions .btn')
			// const keys = this.querySelectorAll('.keyboard .key')

			// regionButtons.forEach(btn => {
			// 	btn.addEventListener('click', () => {
			// 		keys.forEach(k => k.classList.remove('highlight'))
			// 		const region = btn.classList[1]

			// 		keys.forEach(k => {
			// 			if (k.classList.contains(region)) {
			// 				k.classList.add('highlight')
			// 			}
			// 		})
			// 	})
			// })
		}
	}
)
