import { JSDOM } from 'jsdom'
import { readFile, unlink } from 'fs/promises'

import { build } from '../pack'
import { Bundle } from '../iso'


describe(build, () => {
  test('builds bundle', async () => {
    const bundle = new Bundle()
    await import('./.test-pack/foo')

    await build(bundle, '/tmp/test-pack.js')
    expect(bundle.closed).toBe(true)

    const contents = await readFile('/tmp/test-pack.js', 'utf8')
    await unlink('/tmp/test-pack.js')

    const dom = new JSDOM(`<!DOCTYPE html><head><script>${contents}</script></head><body></body>`,
      { runScripts: 'dangerously' })

    await new Promise(resolve => dom.window.addEventListener('DOMContentLoaded', () => {
      dom.window.addEventListener('load', resolve)
    }))

    expect(dom.window.document.body.innerHTML).toBe('Hellow, World!')
  })
})
