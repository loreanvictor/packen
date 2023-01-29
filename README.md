<div align="right">

![types](https://img.shields.io/npm/types/packen?label=&color=black&style=flat-square)
[![version](https://img.shields.io/npm/v/packen?label=&color=black&style=flat-square)](https://www.npmjs.com/package/packen)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/packen/coverage.yml?label=%20&style=flat-square)](https://github.com/loreanvictor/packen/actions/workflows/coverage.yml)

</div>



<img src="logo-dark.svg#gh-dark-mode-only" height="64px"/>
<img src="logo-light.svg#gh-light-mode-only" height="64px"/>

<small>Pack isomorphic JavaScript</small>



<br><br>

`packen` helps with collecting [isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) code executed server-side so that it can get bundled, shipped and executed on client-side. It can act as a simple utility collecting & shipping side effects (such as [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) registration code) to client, or as a basis for more involved isomorphic JavaScript application (such as tooling-specific SSR).

```js
// server side code:

import { Bundle, write } from 'packen'

const bundle = new Bundle()

// run some server-side code, including
// some isomorphic code you want to ship
// to client as well ...

write(bundle, 'dist/bundle.entry.js')
```
```js
// isomorphic code:

import { packMe } from 'packen/iso'

// 👇 call this in your file with side effects, so that it is collected
//    in the bundle. this has no effect if a bundle is not created before
//    its execution.
packMe()

// run the isomorphic code, for example registring some web components.
```

<br>

Executing this code will result in a file at `dist/bundle.entry.js`, which can be safely imported and bundled for
browser.

- You need your own bundler, `packen` only gives you an entry file (which honestly, you could create manually rather easily, so use `packen` only if you are super lazy or if you want to build further tooling on top of it).
- Make sure to import stuff from `packen/iso` instead of `packen` on isomorphic bits of the code, as otherwise your bundler will run into issues trying to bundle server-specific code (such as `fs` stuff).

<br>

# Extension

By default, `packen` will just import collected files as side-effect:

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

write(bundle, 'dist/bundle.entry.js', dryRun)
```
```js
// isomorphic code

import { packMe } from 'packen/iso'

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
