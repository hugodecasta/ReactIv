import Component from "../core/Component.js"

export default function Button(...inner) {
    return new Component('button').class('MD2btn').add(...inner)
}