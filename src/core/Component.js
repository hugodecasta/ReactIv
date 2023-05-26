import { v4 as uuid } from 'uuid'
import Reacter from './Reacter.js'

// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------- CLASS ----

export default class Component {

    // ------------------------------------------------ DATA

    // ----------------- COMPILE DATA
    id = undefined
    #node = undefined

    // ----------------- HTML DATA
    #classes = []
    #elements = []
    #style = {}
    #events = []

    // ------------------------------------------------ CONSTRUCT

    /**
     * 
     * @param {string} tag Component DOM element tag
     */
    constructor(tag) {
        this.id = uuid()

        this.#node = document.createElement(tag)
    }

    // ------------------------------------------------ OTFs

    // --------------------------- MAIN OTFs

    /**
     * Add classes to your component
     * @param {string} classes Space separated class names
     * @returns current Component
     */
    class(classes) {
        this.#classes.push(...classes.split(' ').filter(e => e))
        this.#classes = this.#classes.filter((e, i, s) => s.indexOf(e) == i)
        return this
    }
    /**
     * Set component style
     * @param {object} style JSON encoded css style
     * @returns current Component
     */
    style(style) {
        this.#style = { ...this.#style, ...style }
        return this
    }
    /**
     * Add sub element
     * @param  {...any} elements Elements
     * @returns current Component
     */
    add(...elements) {
        this.#elements.push(...elements)
        for (const element of elements) {
            if (element instanceof Reacter) {
                element.subscribe(() => { this.render() })
            }
        }
        return this
    }
    /**
     * Hook event to the Component DOM element
     * @param {string} event_name Event type name
     * @param {function} func Callback function
     * @returns current Component
     */
    on(event_name, func) {
        this.#events.push([event_name, func])
        return this
    }

    // --------------------------- SUGAR OTFs

    /**
     * SUGAR: hook click event (this.on("click",...))
     * @param {function} func OnClick event callback
     * @returns current Component
     */
    click(func) {
        return this.on('click', func)
    }

    // ------------------------------------------------ RENDER

    async render() {

        // ---- prepare data
        const node = this.#node
        node.innerHTML = ''

        // ---- add elements
        for (const element of this.#elements) {

            if (element instanceof Component) {
                element.render()
                node.append(element.get_element())
            }
            else if (element instanceof Reacter) {
                node.append(element.value)
            }
            else if (typeof element == 'string') {
                node.append(element)
            }

        }

        // ---- add style
        node.setAttribute('style',
            Object.entries(this.#style)
                .map(([name, value]) => `${name}:${value}`)
                .join(';')
        )

        // ---- add events
        for (const [event_name, func] of this.#events) {
            node.addEventListener(event_name, func)
        }

    }

    // ------------------------------------------------ EXTERNALIZED

    get_element() {
        return this.#node
    }

}