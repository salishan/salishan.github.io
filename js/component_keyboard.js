import { getPrefix } from './head.js'

customElements.define(
	getPrefix('keyboard'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#keyboard = [
			// Number row
			['`', '~'], // TLDE
			['1', '!'], // AE01
			['2', '@'], // AE02
			['3', '#'], // AE03
			['4', '$'], // AE04
			['5', '%'], // AE05
			['6', '^'], // AE06
			['7', '&'], // AE07
			['8', '*'], // AE08
			['9', '(', '‿'], // AE09
			['0', ')', '·'], // AE10
			['-', '_'], // AE11
			['=', '+'], // AE12

			// Top letter row
			['q', 'Q', 'θ'], // AD01
			['w', 'W', 'ʷ'], // AD02
			['e', 'E', 'ɛ'], // AD03
			['r', 'R', 'χ'], // AD04
			['t', 'T', 'Ŧ'], // AD05
			['y', 'Y', 'ɣ'], // AD06
			['u', 'U', 'ʕ'], // AD07
			['i', 'I', 'ɨ'], // AD08
			['o', 'O', 'ʔ', 'Ɂ'], // AD09
			['p', 'P', 'ʧ'], // AD10
			['[', '{', 'ŋ'], // AD11
			[']', '}'], // AD12

			// Home row
			['a', 'A', 'Ⱥ'], // AC01
			['s', 'S', 'ɬ'], // AC02
			['d', 'D', 'ɫ'], // AC03
			['f', 'F', 'ʃ'], // AC04
			['g', 'G', 'ɢ'], // AC05
			['h', 'H', 'ə'], // AC06
			['j', 'J', 'ɩ'], // AC07
			['k', 'K', 'ɯ'], // AC08
			['l', 'L', 'ƛ'], // AC09
			[';', ':', 'ʦ'], // AC10
			["'", '"', 'ʼ'], // AC11

			['\\', '|'], // BKSL

			// Bottom row
			['z', 'Z', '́'], // AB01
			['x', 'X', '̓'], // AB02
			['c', 'C', '̄'], // AB03
			['v', 'V', '̃'], // AB04
			['b', 'B', '̌'], // AB05
			['n', 'N', '̵'], // AB06
			['m', 'M', '̴'], // AB07
			[',', '<', '̣'], // AB08
			['.', '>', '̞'], // AB09
			['/', '?', '̱'], // AB10
		]

		#generateKeys() {
			return this.#keyboard
				.map(key => {
					const chars = key
						.map(char => {
							return `
						<span class="char">
							${char}
						</span>
					`
						})
						.join('')

					return `
					<div class="key" data-tooltip="Hola">
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
