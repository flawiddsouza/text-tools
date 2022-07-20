export function saveAndLoad(inputElement, localStorageKey) {
    inputElement.addEventListener('input', () => {
        localStorage.setItem(localStorageKey, inputElement.value)
    })

    inputElement.value = localStorage.getItem(localStorageKey)
}

export function wrapText(text, cutoffLength) {
    return text.replace(new RegExp(`(.{${cutoffLength}})`, 'g'), '$1\n')
}

export function drawTable(rows, { cutoffLength }) {
    let maxLineLength = 0

    rows.forEach(cells => {
        cells.forEach(cell => {
            const lines = wrapText(cell, cutoffLength).split('\n')
            lines.forEach(line => {
                if(line.length > maxLineLength) {
                    maxLineLength = line.length
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
        const repeat = (maxLineLength * cells.length) + 7
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
                const emptySpaces = currentLine.length < maxLineLength ? ' '.repeat(maxLineLength - currentLine.length) : ''
                boxes += `${start}${currentLine}${emptySpaces}${end}`
            } else {
                boxes += `${start}${' '.repeat(maxLineLength)}${end}`
            }
        })
        boxes += '\n'
    }

    // bottom
    if(drawBottom) {
        const repeat = (maxLineLength * cells.length) + 7
        boxes += '-'.repeat(repeat)
        boxes += '\n'
    }

    return boxes
}
