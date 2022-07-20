import converters from './converters.js'
import { saveAndLoad } from './helpers.js'

const id = document.getElementById.bind(document)

const converter = id('converter')
const convert = id('convert')
const input = id('input')
const output = id('output')

saveAndLoad(input, 'TextTools-Input')

convert.addEventListener('click', () => {
    if(converter.value in converters) {
        output.value = converters[converter.value](input.value)
    } else {
        output.value = 'Not Implemented'
    }
})
