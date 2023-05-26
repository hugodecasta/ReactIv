# ReactIv

ReactIv

## Installation

`npm i ReactIv`

## Usage

`MyComponent.js`

```javascript
import ReactIv from "ReactIv"
const { MD2 } = ReactIv

// ---- Create simple reactive variable
const counter = new ReactIv.Reacter(0)

export default function MyComponent() {
  return MD2.App().add(MD2.Button("Value: ", counter))
}
```

`index.js`

```javascript
import ReactIv from "ReactIv"
import MyComponent from "./MyComponent.js"

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
