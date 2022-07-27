export function saveAndLoad(inputElement, localStorageKey, initialValue, callback=null) {
    inputElement.addEventListener('input', () => {
        localStorage.setItem(localStorageKey, inputElement.value)
    })

    const storedValue = localStorage.getItem(localStorageKey)
    inputElement.value = storedValue !== null && storedValue !== '' ? storedValue : initialValue

    if(callback) {
        callback()
    }
}

export function wrapText(text, cutoffLength) {
    return text.replace(new RegExp(`(.{${cutoffLength}})`, 'g'), '$1\n')
}

export function drawTable(rows, { cutoffLength }) {
    let maxLineLength = {}

    rows.forEach(cells => {
        cells.forEach((cell, cellIndex) => {
            if(cellIndex in maxLineLength === false) {
                maxLineLength[cellIndex] = 0
            }
            const lines = wrapText(cell, cutoffLength).split('\n')
            lines.forEach(line => {
                if(line.length > maxLineLength[cellIndex]) {
                    maxLineLength[cellIndex] = line.length
                }
            })
        })
    })

    let textTable = ''

    rows.forEach((row, rowIndex) => {
        textTable += drawTableRow(row, { cutoffLength, maxLineLength, drawTop: rowIndex === 0 })
    })

    return textTable
}

export function drawTableRow(cells, { cutoffLength, maxLineLength, drawTop = true, drawBottom = true }) {
    let boxes = ''
    let maxLines = 0

    cells.forEach(cell => {
        const lines = wrapText(cell, cutoffLength).split('\n')
        if(lines.length > maxLines) {
            maxLines = lines.length
        }
    })

    // top
    if(drawTop) {
        const repeat = cells.map((_, cellIndex) => maxLineLength[cellIndex]).reduce((prev, curr) => prev + curr, 0) + (3 * cells.length) + 1
        boxes += '-'.repeat(repeat)
        boxes += '\n'
    }

    // middle
    for(let line=0; line<maxLines; line++) {
        cells.forEach((cell, cellIndex) => {
            const start = cellIndex === 0 ? '| ' : ' '
            const end = ' |'
            const lines = wrapText(cell, cutoffLength).split('\n')
            if(line in lines) {
                const currentLine = lines[line]
                const emptySpaces = currentLine.length < maxLineLength[cellIndex] ? ' '.repeat(maxLineLength[cellIndex] - currentLine.length) : ''
                boxes += `${start}${currentLine}${emptySpaces}${end}`
            } else {
                boxes += `${start}${' '.repeat(maxLineLength[cellIndex])}${end}`
            }
        })
        boxes += '\n'
    }

    // bottom
    if(drawBottom) {
        const repeat = cells.map((_, cellIndex) => maxLineLength[cellIndex]).reduce((prev, curr) => prev + curr, 0) + (3 * cells.length) + 1
        boxes += '-'.repeat(repeat)
        boxes += '\n'
    }

    return boxes
}
