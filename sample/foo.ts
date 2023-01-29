import { packMe } from '../src/iso'

packMe()
console.log('FOO!')

if (globalThis.document) {
  document.body.innerHTML = 'Hellow World!'
}
