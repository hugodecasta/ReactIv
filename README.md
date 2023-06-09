# ReactIv

ReactIv

## Installation

`npm i reactiv-js`

## Usage

`MyComponent.js`

```javascript
import ReactIv from "reactiv-js"
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
import ReactIv from "reactiv-js"
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

One can launch the demo front using the following command:

`PORT=8989 npx http-server ./demo`

## DEV

### installation

```shell
git clone git@github.com:hugodecasta/ReactIv.git

cd reactiv

npm i
```

### Build

`npm run build` or `node build.js`

### Build hotreload

`npm run build-live` or `node build.js -live`
