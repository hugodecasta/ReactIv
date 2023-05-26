import ReactIv from "./reactiv.js"
const { MD2 } = ReactIv

// ---- create a simple counter reacter
const counter = new ReactIv.Reacter(0)

export default function MyComponent() {
    return MD2.App().add(
        MD2.Button('Value 1 :', counter).click(() => counter.value += 1),
        MD2.Button('Value 2 :', counter).click(() => counter.value += 1),
    )
}