import { getPrefix } from './head.js'

customElements.define(
	getPrefix('cinematic'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#dict = {
			1: 'mountains',
			2: 'mountains',
			3: 'mountains',
			4: 'mountains',
			5: 'mountains',
			6: 'mountains',
			7: 'mountains',
			8: 'mountains',
			9: 'mountains',
			10: 'mountains',
			11: 'mountains',
			12: 'mountains',
		}

		#getHeader() {
			const month = new Date().getMonth() + 1
			let currentHeader = `../img/salishan_header-${
				this.#dict[month]
			}.svg`
			return currentHeader
		}

		#data = {
			template: `
				 <header>
						<img
							 src="${this.#getHeader()}"
							 alt="cinematic"
						/>
				 </header>`,
		}

		connectedCallback() {
			this.innerHTML = this.#data.template
		}
	}
)
