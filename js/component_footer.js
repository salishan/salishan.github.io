import { getPrefix } from './head.js'

customElements.define(
	getPrefix('footer'),
	class extends HTMLElement {
		constructor() {
			super()
		}

		#data = {
			template: `
    <footer class="page-footer">
      <p>Built with <span class="heart"></span> by <a href="https://jmiguelrivas.github.io/" target="_BLANK">Miguel Rivas</a>.</p>
      <ul>
        <li>
          <a href="https://github.com/jmiguelrivas" target="_BLANK">github</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@pombo_proibido" target="_BLANK">youtube</a>
        </li>
      </ul>
      <time datetime="2025/05/03">2025.05.05</time>
    </footer>
  `,
		}

		connectedCallback() {
			this.innerHTML = this.#data.template
		}
	}
)
