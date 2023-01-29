import { Bundle, write, sideEffectImport } from '../src'


const bundle = new Bundle()

import './foo'
import './bar'

write(bundle, 'sample/tmp/entry.ts', sideEffectImport({ importRoot: __dirname + '/tmp' }))
