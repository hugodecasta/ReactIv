# ReactIv

ReactIv

## Installation

`npm i ReactIv`

## Usage

`MyComponent.js`

```javascript
import ReactIv from "ReactIv"
const { MD2 } = ReactIv

// ---- create a simple counter reacter
const counter = new ReactIv.Reacter(0)

export default function MyComponent() {
  // ---- create button
  const counter_button = MD2.Button("Value: ", counter)

  // ---- assign click event
  counter_button.click(() => (counter.value += 1))

  // ---- create app component
  const App = MD2.App()
  App.add(counter_button)

  // ---- return component
  return App
}
```

`index.js`

```javascript
import ReactIv from "ReactIv"
import MyComponent from "./MyComponent.js"

// ---- Create app from my component
ReactIv.init("root", MyComponent())
```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ReactIV DEMO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <div id="root" />
    <script src="./index.js" type="module"></script>
  </body>
</html>
```

## Demo

### Installation
