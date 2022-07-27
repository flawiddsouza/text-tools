const converter = document.getElementById('converter')
const customElementHolder = document.getElementById('custom-element-holder')

function loadConverter() {
    if(converter.value === 'HTML Table to Unicode Table') {
        customElementHolder.innerHTML = ''
        customElementHolder.appendChild(document.createElement('html-table-to-unicode-table'))
    }
}

converter.addEventListener('change', () => {
    loadConverter()
})

loadConverter()
