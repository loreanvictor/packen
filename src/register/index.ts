/* istanbul ignore file */
// FIXME: This file is skipped from coverage report due to this issue on jest:
// https://github.com/facebook/jest/issues/5274
// include it in coverage report when (if?) the issue is fixed.

import { Bundle } from '../iso'
import { build } from '../server'


const bundle = new Bundle()
const path = process.env['PACKEN_TO'] || 'bundle.js'

process.on('beforeExit', async () => {
  if (!bundle.closed) {
    await build(bundle, path)
  }
})
