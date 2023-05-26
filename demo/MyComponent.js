import ReactIv from "./reactiv.js"
const { MD2 } = ReactIv

const counter = new ReactIv.Reacter(0)

export default function MyComponent() {
    return MD2.App().add(MD2.Button('Value:', counter))
}