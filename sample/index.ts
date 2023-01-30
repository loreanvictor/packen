import { Bundle, build } from '../src'


const bundle = new Bundle()

import './foo'
import './bar'

build(bundle, 'sample/tmp/entry.js')
