import { h, render } from '../libs/quick-dom-constructor.js'
import { saveAndLoad, drawTable } from '../libs/helpers.js'
import samples from './samples.js'

customElements.define('html-table-to-unicode-table', class extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        this.key = 'HTML Table to Unicode Table'
        this.input = null
        this.output = null
    }

    connectedCallback() {
        this.div = render(
            h('div', { style: 'display: flex; gap: 1rem; height: 100%' }, [
                h('textarea', {
                    style: 'width: 100%; resize: none;',
                    spellcheck: false,
                    ref: element => this.input = element,
                    onInput: () => {
                        this.output.value = this.convert(this.input.value)
                    }
                }),
                h('textarea', {
                    style: 'width: 100%; resize: none;',
                    readonly: true,
                    wrap: 'off',
                    ref: element => this.output = element
                })
            ])
        )

        saveAndLoad(this.input, `TextTools-Input-${this.key}`, samples[this.key], () => {
            this.output.value = this.convert(this.input.value)
        })

        this.shadowRoot.append(this.div)
    }

    convert(input) {
        const htmlParser = new DOMParser()
        const tableDom = htmlParser.parseFromString(input, 'text/html')
        const trs = Array.from(tableDom.querySelectorAll('tr'))

        const rows = []

        trs.forEach(tr => {
            const cells = Array.from(tr.querySelectorAll('th, td')).map(cell => cell.textContent.trim())
            if(cells.length) {
                rows.push(cells)
            }
        })

        return drawTable(rows, { cutoffLength: 40 })
    }
})
