import { packMe } from '../../../iso'

packMe()

if (globalThis.document) {
  window.onload = () => {
    document.body.textContent = 'Hellow, World!'
  }
}
