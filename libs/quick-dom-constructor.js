// From: https://snippets.artelin.dev/snippet/24/lib.js

export function h(...args) {
    let tagName = '', attributes = {}, children = []

    if(args.length === 2) {
        tagName = args[0]
        if(Array.isArray(args[1]) || typeof args[1] === 'string') {
            children =  args[1]
        } else {
            attributes = args[1]
        }
    }

    if(args.length === 3) {
        tagName = args[0]
        attributes = args[1]
        children = args[2]
    }

    return { tagName, attributes, children: typeof children === 'string' ? [children] : children }
}

export function render({ tagName, attributes = {}, children = [] }){
    const element = document.createElement(tagName)

    children.forEach(child =>  {
        if(typeof child === 'string') {
            element.appendChild(document.createTextNode(child))
        } else {
            element.appendChild(render(child))
        }
    })

    if(Object.keys(attributes).length) {
        for(let [key, value] of Object.entries(attributes)) {
            if(key === 'ref') {
                value(element)
                continue
            }

            if(key.startsWith('on')) {
                element.addEventListener(key.replace('on', '').toLowerCase(), value)
                continue
            }

            if(key === 'style') {
                if(typeof value === 'string') {
                    element.style = value
                } else {
                    for(const [styleKey, styleValue] of Object.entries(value)) {
                        element.style[styleKey] = styleValue
                    }
                }
                continue
            }

            if(key === 'required') {
                element.setAttribute(key, '')
                continue
            }

            element.setAttribute(key, value)
        }
    }

    return element
}
