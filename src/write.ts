import { writeFile } from 'fs/promises'

import { Bundle } from './iso'
import { Processor, bareImport } from './processor'


export function serialize(bundle: Bundle, processor = bareImport()) {
  bundle.close()

  return bundle.entries.map(processor).join('\n')
}


export async function write(bundle: Bundle, path: string, processor?: Processor) {
  await writeFile(path, serialize(bundle, processor) + '\n', 'utf8')
}
