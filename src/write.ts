import { writeFile } from 'fs/promises'

import { Bundle } from './iso'
import { Processor, sideEffectImport } from './processor'


export function serialize(bundle: Bundle, processor = sideEffectImport()) {
  return bundle.entries.map(processor).join('\n')
}


export async function write(bundle: Bundle, path: string, processor?: Processor) {
  await writeFile(path, serialize(bundle, processor) + '\n', 'utf8')
}
