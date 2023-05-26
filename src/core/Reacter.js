import { v4 as uuid } from 'uuid'

// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------- CLASS ----

export default class Reacter {

    // ------------------------------------------------ DATA

    // ----------------- COMPILE DATA

    id = undefined
    #value = undefined
    #callbacks = []

    // ------------------------------------------------ CONSTRUCT

    /**
     * 
     * @param {any} default_value first reacter value
     */
    constructor(default_value) {
        this.id = uuid()
        this.#value = default_value
    }

    // ------------------------------------------------ VALUE MANAGERS

    /**
     * Get or set the value as a normal variable
     * @type {any}
     * @return {any}
     */
    set value(value) {
        const old_value_str = JSON.stringify(this.#value)
        const new_value_str = JSON.stringify(value)
        if (old_value_str == new_value_str) return
        this.#value = value
        this.#trigger(JSON.parse(old_value_str), value)
    }

    get value() {
        return this.#value
    }

    // ------------------------------------------------ CALLBACK MANAGERS

    /**
     * Subscribe to the reacter change
     * @param {function} func function called on reacter value change
     */
    subscribe(func) {
        this.#callbacks.push(func)
    }

    #trigger(old_value, new_value) {
        this.#callbacks.forEach(func => func(old_value, new_value))
    }
}