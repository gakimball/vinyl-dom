# vinyl-dom

[Vinyl](https://github.com/gulpjs/vinyl) adapter for DOM nodes. Wait, what?

Works like Gulp/vinyl-fs's `.src()` and `.dest()` functions, but `.src()` takes in the inner HTML of an element (or the value of a form field), and `.dest()` writes stream values to an element.

## Installation

```bash
npm install vinyl-dom --save
```

## Usage

vinyl-dom creates Vinyl files like any other source adapter. The `path` is the ID of the element (if it has one), and `contents` is a buffer of the inner HTML of the element, or the value if it's a form field.

```js
var dom = require('vinyl-dom');

dom.src('#input')
  .pipe(/* Use most Gulp plugins here! */)
  .pipe(dom.dest('#output'));
```

### `src(input)`

Takes a single DOM element and creates a Vinyl file out of its `value` or `innerHTML` property. `input` can be a selector or an HTMLElement. The function uses `.querySelector()`, so only one element is read.

### `dest(output)`

Transfers the contents of the stream into the `value` or `innerHTML` property of the target element. Since `dom.src()` only creates one file in the stream, there's only one value that can be transferred. Like with `.src()`, the `output` parameter can be a selector or an HTMLElement.

`.dest()` is also a passthrough, so you can pipe it to more transforms.
