import converters from './converters.js'
import samples from './samples.js'
import { saveAndLoad } from './helpers.js'

const id = document.getElementById.bind(document)

const converter = id('converter')
const input = id('input')
const output = id('output')

// Load Sample Data for Each Converter
converter.addEventListener('change', () => {
    converter.value = samples[converter.value]
})

function convert() {
    if(converter.value in converters) {
        output.value = converters[converter.value](input.value)
    } else {
        output.value = 'Not Implemented'
    }
}

input.addEventListener('input', convert)

saveAndLoad(input, `TextTools-Input-${converter.value}`, samples[converter.value], convert)
