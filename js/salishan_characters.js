import { getPrefix } from './head.js'
import keyboard from './keyboard.js'

const letters = keyboard

customElements.define(
	getPrefix('characters'),
	class extends HTMLElement {
		#generateKeySection() {
			return letters
				.map(char => {
					return `
				<article>
					<nn-fila break="sm">
						<nn-pilar size="30%">
							<p class="label">
								${char.label}
							</p>
						</nn-pilar>
						<nn-pilar size="70%">
							<p class="description">
								${char.description}
							</p>
						</nn-pilar>
					</nn-fila>
				</article>
				`
				})
				.join('')
		}

		#template = `
<salishan-navbar no-searchbar></salishan-navbar>
<nn-caja padding="1rem" max-width="1000px">
  <main>    
	<h1>Available Characters Combinations</h1>
	<section>
		${this.#generateKeySection()}
	</section>
  </main>
</nn-caja>
<salishan-footer></salishan-footer>
`

		connectedCallback() {
			this.innerHTML = this.#template
		}
	}
)
