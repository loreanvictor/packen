<div align="right">

![types](https://img.shields.io/npm/types/packen?label=&color=black&style=flat-square)
[![version](https://img.shields.io/npm/v/packen?label=&color=black&style=flat-square)](https://www.npmjs.com/package/packen)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/packen/coverage.yml?label=%20&style=flat-square)](https://github.com/loreanvictor/packen/actions/workflows/coverage.yml)

</div>

<img src="logo-dark.svg#gh-dark-mode-only" height="64px"/>
<img src="logo-light.svg#gh-light-mode-only" height="64px"/>

<br>

[**`packen`**](.) collects [isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) code when it runs on the server, and prepares it for shipping to and running on the client. Useful for server side rendering (SSR), static site generation (SSG), etc.

```js
// server side code:

import { Bundle, build } from 'packen/server'

const bundle = new Bundle()

// run some server-side code, including
// some isomorphic code you want to ship
// to client as well ...

build(bundle, 'dist/bundle.js')
```
```js
// isomorphic code:

import { packMe } from 'packen'

// 👇 call this in your file with side effects, so that it is collected
//    in the bundle. this has no effect if a bundle is not created before
//    its execution.
packMe()

// run the isomorphic code, for example registring some web components.
```

<br>

- ☕&emsp;Convenient: earmark isomorphic files, and let [**`packen`**](.) do the rest.
- 🛠️&emsp;Flexible: use [**`packen`**](.) with _any_ bundler you like, [the way you like](#bundling).
- 🧩&emsp;Extensible: write your own [custom processors](#extension) suitable for your use cases.

<br>

# Installation

You need [Node.js](https://nodejs.org) for using `packen`.

```bash
npm i packen
```

<br>

# Usage

**STEP 1**: Create a bundle:

```js
// server side code:
import { Bundle } from 'packen/server'

const bundle = new Bundle()
```

<br>

**STEP 2**: earmark your isomorphic code:

```js
// isomorphic code:
import { packMe } from 'packen'

packMe()

// rest of your code
```

> You can also call `packMe()` inside a function. It will earmark the file it resides in when the function is called.

<br>

**STEP 3**: run the isomorphic code on the server:

```js
// server side code:

import 'my/isomorphic/code'
```

> If you call `packMe()` inside a function, you need to call that function to collect the file.

<br>

**STEP 4**: build the bundle:

```js
// server side code:
import { build } from 'packen/server'

build(bundle, 'dist/bundle.js')
```

<br>

## Bundling

[**`packen`**](.) provides a flexible API for building bundles:

<br>

### Build

```ts
build(bundle: Bundle, path: string, processor?: Processor): void
```

Builds given bundle, bundles and minifies it (using [esbuild](https://esbuild.github.io)) and writes it to given path. If a processor is provided, will be used for processing earmarked entries (see [Extension](#extension)).

```js
import { Bundle, build } from 'packen/server'

const bundle = new Bundle()

// ...

build(bundle, 'dist/bundle.js')
```

<br>

### Pack

```ts
pack(bundle: Bundle, processor?: Processor): string
```

Builds given bundle, returning the bundled and minified code as a strin (uses [esbuild](https://esbuild.github.io)). If a processor is provided, will be used for processing earmarked entries (see [Extension](#extension)).

```js
import { Bundle, pack } from 'packen/server'

const bundle = new Bundle()

// ...

const code = pack(bundle)
```

<br>

This method can be used for generating server-side HTML:

```js
const myHTML = html`
  <html>
    <head>
      <script type="module">
        ${pack(bundle)}
      </script>
    </head>
    <body>
      <!-- ... -->
    </body>
  </html>
`
```

<br>

### Write

```ts
write(bundle: Bundle, path: string, processor?: Processor): void
```

Builds an entry file for given bundle, and writes it to given path. If a processor is provided, will be used for processing earmarked entries (see [Extension](#extension)). DOES NOT bundle or minify the code.

```js
import { Bundle, write } from 'packen/server'

const bundle = new Bundle()

// ...

write(bundle, 'dist/entry.js')
```

<br>

This entry file can be used with other bundlers, like [Vite](https://vitejs.dev):

```html
<!-- index.html -->
<script type="module" src="dist/entry.js"></script>
<!-- ... -->
```
```bash
vite build
```

<br>

### Serialize

```ts
serialize(bundle: Bundle, processor?: Processor): string
```

Builds an entry file for given bundle, returning the code as a string. If a processor is provided, will be used for processing earmarked entries (see [Extension](#extension)). DOES NOT bundle or minify the code.

```js
import { Bundle, serialize } from 'packen/server'

const bundle = new Bundle()

// ...

const code = serialize(bundle)
```

<br>

This is particularly useful when you want to use other bundlers programmatically (or even using [esbuild](https://esbuild.github.io) with some custom configuration):

```js
import { build } from 'esbuild'

  await build({
    stdin: {
      contents: serialize(bundle, processor),
      resolveDir: process.cwd(),
    },
    // your esbuild configuration
  })
```

<br>

# Extension

By default, [**packen**](.) will use bare imports, collecting files as side-effect:

```js
// entry file

import '/Path/to/some/isomorphic.js'

// ...
```

<br>

You can change this behavior by providing a _processor_ function to `write()` method. This processor will be passed a [`CallSite`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules__types_node_globals_d_.nodejs.callsite.html), and should turn it into some valid JavaScript string. For example, the following custom processor allows collecting specific functions, which then will be executed on client side:

```js
export dryRun = entry => {
  const func = entry.getFunctionName()
  const file = entry.getFileName()
  
  return `
    import { ${func} } from '${file}';
    ${func}();
  `
}
```

<br>


This processor can be used like this:

```js
// ...

build(bundle, 'dist/bundle.js', dryRun)
```
```js
// isomorphic code

import { packMe } from 'packen'

export const myFunc = () => {

  // this function will be collected for client side bundling
  // and executed on client bootstrap.
  packMe()
  
  // do other stuff
}
```

<br>

# Contribution

You need [node](https://nodejs.org/en/), [NPM](https://www.npmjs.com) to start and [git](https://git-scm.com) to start.

```bash
# clone the code
git clone git@github.com:loreanvictor/packen.git
```
```bash
# install stuff
npm i
```

Make sure all checks are successful on your PRs. This includes all tests passing, high code coverage, correct typings and abiding all [the linting rules](https://github.com/loreanvictor/quel/blob/main/.eslintrc). The code is typed with [TypeScript](https://www.typescriptlang.org), [Jest](https://jestjs.io) is used for testing and coverage reports, [ESLint](https://eslint.org) and [TypeScript ESLint](https://typescript-eslint.io) are used for linting. Subsequently, IDE integrations for TypeScript and ESLint would make your life much easier (for example, [VSCode](https://code.visualstudio.com) supports TypeScript out of the box and has [this nice ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), but you could also use the following commands:

```bash
# run tests
npm test
```
```bash
# check code coverage
npm run coverage
```
```bash
# run linter
npm run lint
```

<br><br>
