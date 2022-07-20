import { drawTable } from './helpers.js'

export default {
    'HTML Table to Unicode Table'(input) {
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
}
