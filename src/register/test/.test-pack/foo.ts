import { packMe } from '../../../iso'


packMe()

if (globalThis.document) {
  globalThis.document.body.textContent = 'Ladida'
}
