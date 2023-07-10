import { Bundle } from '../bundle'
import { mark, collect, markCaller } from '../mark'


describe(mark, () => {
  test('creates a mark that can be packed later.', () => {
    const m = mark()

    const bundle = new Bundle()
    collect(m)
    bundle.close()

    expect(bundle.entries).toHaveLength(1)
    expect(bundle.entries[0]!.getFileName()).toBe(__filename)
  })
})

describe(markCaller, () => {
  test('creates a mark of the caller function that can be collected later.', () => {
    function fn() {
      return gn()
    }

    function gn() {
      const site = markCaller()

      return () => collect(site)
    }

    const cb = fn()

    const bundle = new Bundle()
    cb()
    bundle.close()

    expect(bundle.entries).toHaveLength(1)
    expect(bundle.entries[0]!.getFileName()).toBe(__filename)
    expect(bundle.entries[0]!.getFunctionName()).toBe('fn')
  })
})

describe(collect, () => {
  test('is ok with undefined.', () => {
    expect(() => collect(undefined)).not.toThrow()
  })
})

