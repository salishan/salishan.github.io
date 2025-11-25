import { getPrefix } from './head.js'

const styles = new CSSStyleSheet()
styles.replaceSync(`
:host {
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	justify-content: center;
	text-align: center;

	.key {
		width: 75px;
		height: 75px;
		display: flex;
		font-size: 1.25rem;
		flex-direction: column-reverse;
		flex-wrap: wrap;
		background-color: #49946e;
		box-shadow: #36745f 4px 4px 1px;
		transform: translate(0, 0);
		border-radius: 5px;
		transition: transform 100ms ease-in-out, box-shadow 100ms ease-in-out;

		&.top {
			background-color: #3f70b9;
			box-shadow: #2a486b 4px 4px 1px;
		}

		&.bottom {
			background-color: #c06262;
			box-shadow: #6b2a2a 4px 4px 1px;
		}

		&.special {
			background-color: #a040b8;
			box-shadow: #532a6b 4px 4px 1px;
		}

		&.blank {
			background-color: #3d3d3d;
			box-shadow: #1b1b1b 4px 4px 1px;
		}

		&.wide-2 {
			width: 158px;
		}

		&.wide-3 {
			width: 240px;
		}

		&.special,
		&.blank {
			font-size: 1rem;
			align-items: start;
			.char {
				flex-basis: 100%;
				width: 100%;
				padding-inline: 0.25rem;
			}
		}

		&.spacebar {
			width: 822px;
		}

		&:hover {
			z-index: 1;
			box-shadow: #313131 1px 1px 1px;
			transform: translate(3px, 3px);
		}

		.char {
			width: 50%;
			height: 50%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: #d4e7ff;

			&:nth-child(3),
			&:nth-child(4) {
				color: #252740;
			}
		}
	}
}

@media (max-width: 1350px) {
	:host {
		.key {
			&.empty-key,
			&.wide-2,
			&.wide-3 {
				display: none;
			}
		}
	}
}
`)

customElements.define(
	getPrefix('keyboard'),
	class extends HTMLElement {
		constructor() {
			super()
			this.attachShadow({ mode: 'open' })
			this.shadowRoot.adoptedStyleSheets = [styles]
			this.shadowRoot.innerHTML = this.#data.template
		}

		#keyboard = [
			// =========================
			// Number row
			// =========================
			{ cat: 'top', tooltip: null, chars: ['`', '~'] }, // TLDE
			{ cat: 'top', tooltip: null, chars: ['1', '!'] }, // AE01
			{ cat: 'top', tooltip: null, chars: ['2', '@'] }, // AE02
			{ cat: 'top', tooltip: null, chars: ['3', '#'] }, // AE03
			{ cat: 'top', tooltip: null, chars: ['4', '$'] }, // AE04
			{ cat: 'top', tooltip: null, chars: ['5', '%'] }, // AE05
			{ cat: 'top', tooltip: null, chars: ['6', '^'] }, // AE06
			{ cat: 'top', tooltip: null, chars: ['7', '&'] }, // AE07
			{ cat: 'top', tooltip: null, chars: ['8', '*'] }, // AE08
			{ cat: 'top', tooltip: 'undertie', chars: ['9', '(', '‿'] }, // AE09 (‿)
			{ cat: 'top', tooltip: 'middle dot', chars: ['0', ')', '·'] }, // AE10 (·)
			{ cat: 'top', tooltip: null, chars: ['-', '_'] }, // AE11
			{ cat: 'top', tooltip: null, chars: ['=', '+'] }, // AE12
			{ cat: 'blank', tooltip: null, chars: ['backspace'], size: 2 },

			// =========================
			// Top letter row
			// =========================
			{ cat: 'blank', tooltip: null, chars: ['tab'], size: 2 },
			{ cat: 'rest', tooltip: 'letter theta', chars: ['q', 'Q', 'θ'] }, // AD01
			{
				cat: 'rest',
				tooltip: 'modifier letter small w (labialization)',
				chars: ['w', 'W', 'ʷ'],
			}, // AD02
			{ cat: 'rest', tooltip: 'letter epsilon', chars: ['e', 'E', 'ɛ'] }, // AD03
			{ cat: 'rest', tooltip: 'letter chi', chars: ['r', 'R', 'χ'] }, // AD04
			{
				cat: 'rest',
				tooltip: 'letter capital T with stroke',
				chars: ['t', 'T', 'Ŧ'],
			}, // AD05
			{ cat: 'rest', tooltip: 'letter gamma', chars: ['y', 'Y', 'ɣ'] }, // AD06
			{ cat: 'rest', tooltip: 'reverse glottal stop', chars: ['u', 'U', 'ʕ'] }, // AD07
			{ cat: 'rest', tooltip: 'letter i with stroke', chars: ['i', 'I', 'ɨ'] }, // AD08
			{ cat: 'rest', tooltip: 'glottal stop', chars: ['o', 'O', 'ʔ', 'Ɂ'] }, // AD09 (primary: ʔ)
			{ cat: 'rest', tooltip: 'letter tf', chars: ['p', 'P', 'ʧ'] }, // AD10
			{ cat: 'rest', tooltip: 'eng letter', chars: ['[', '{', 'ŋ'] }, // AD11
			{ cat: 'rest', tooltip: null, chars: [']', '}'] }, // AD12
			{ cat: 'rest', tooltip: null, chars: ['\\', '|'] }, // BKSL

			// =========================
			// Home row
			// =========================
			{ cat: 'blank', tooltip: null, chars: ['cap lock'], size: 2 },
			{
				cat: 'rest',
				tooltip: 'letter capital A with stroke',
				chars: ['a', 'A', 'Ⱥ'],
			}, // AC01
			{ cat: 'rest', tooltip: 'letter l with belt', chars: ['s', 'S', 'ɬ'] }, // AC02
			{ cat: 'rest', tooltip: 'letter l with tilde', chars: ['d', 'D', 'ɫ'] }, // AC03
			{ cat: 'rest', tooltip: 'letter esh', chars: ['f', 'F', 'ʃ'] }, // AC04
			{
				cat: 'rest',
				tooltip: 'letter small capital G',
				chars: ['g', 'G', 'ɢ'],
			}, // AC05
			{ cat: 'rest', tooltip: 'schwa', chars: ['h', 'H', 'ə'] }, // AC06
			{ cat: 'rest', tooltip: 'letter iota', chars: ['j', 'J', 'ɩ'] }, // AC07
			{ cat: 'rest', tooltip: 'letter turned m', chars: ['k', 'K', 'ɯ'] }, // AC08
			{ cat: 'rest', tooltip: 'lambda with stroke', chars: ['l', 'L', 'ƛ'] }, // AC09
			{ cat: 'rest', tooltip: 'letter ts', chars: [';', ':', 'ʦ'] }, // AC10
			{
				cat: 'rest',
				tooltip: 'modifier apostrophe (glottalization)',
				chars: ["'", '"', 'ʼ'],
			}, // AC11
			{ cat: 'blank', tooltip: null, chars: ['enter'], size: 2 },

			// =========================
			// Bottom row (combining marks)
			// =========================
			{ cat: 'special', tooltip: null, chars: ['left shift'], size: 2 },
			{ cat: 'bottom', tooltip: 'acute accent', chars: ['z', 'Z', '́'] }, // AB01
			{
				cat: 'bottom',
				tooltip: 'combining comma above (glottalization)',
				chars: ['x', 'X', '̓'],
			}, // AB02
			{ cat: 'bottom', tooltip: 'combining macron', chars: ['c', 'C', '̄'] }, // AB03
			{ cat: 'bottom', tooltip: 'combining tilde', chars: ['v', 'V', '̃'] }, // AB04
			{ cat: 'bottom', tooltip: 'combining caron', chars: ['b', 'B', '̌'] }, // AB05
			{
				cat: 'bottom',
				tooltip: 'combining short stroke overlay',
				chars: ['n', 'N', '̵'],
			}, // AB06
			{
				cat: 'bottom',
				tooltip: 'combining tilde overlay',
				chars: ['m', 'M', '̴'],
			}, // AB07
			{
				cat: 'bottom',
				tooltip: 'Combining Down Tack Below',
				chars: [',', '<', '̞'],
			}, // AB08
			{
				cat: 'bottom',
				tooltip: 'combining dot below',
				chars: ['.', '>', '̣'],
			}, // AB09
			{
				cat: 'bottom',
				tooltip: 'combining macron below',
				chars: ['/', '?', '̱'],
			}, // AB10
			{ cat: 'special', tooltip: null, chars: ['right shift'], size: 3 },

			// special section
			{ cat: 'blank', tooltip: null, chars: ['left ctrl'], size: 1 },
			{ cat: 'blank', tooltip: null, chars: ['super'], size: 1 },
			{ cat: 'blank', tooltip: null, chars: ['left alt'], size: 1 },
			{ cat: 'blank spacebar', tooltip: null, chars: ['spacebar'], size: 1 },
			{ cat: 'special', tooltip: null, chars: ['right alt'], size: 1 },
			{ cat: 'blank', tooltip: null, chars: ['right ctrl'], size: 1 },
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
				<div class="key ${key.cat} ${!key.tooltip ? 'empty-key' : ''} ${
						key.size ? `wide-${key.size}` : ''
					}" ${key.tooltip ? `title="${key.tooltip.toUpperCase()}"` : ''}>
					${chars}
				</div>
			`
				})
				.join('')
		}

		#data = {
			template: `${this.#generateKeys()}`,
		}
	}
)
