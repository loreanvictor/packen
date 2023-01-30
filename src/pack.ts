import { writeFile } from 'fs/promises'
import { build as _build } from 'esbuild'

import { serialize } from './write'
import { Bundle } from './iso'
import { Processor } from './processor'


export async function pack(bundle: Bundle, processor?: Processor) {
  const res = await _build({
    stdin: {
      contents: serialize(bundle, processor),
      resolveDir: process.cwd(),
    },
    bundle: true,
    minify: true,
    write: false,
  })

  return res.outputFiles[0]!.text
}


export async function build(bundle: Bundle, path: string, processor?: Processor) {
  const contents = await pack(bundle, processor)
  await writeFile(path, contents)
}
