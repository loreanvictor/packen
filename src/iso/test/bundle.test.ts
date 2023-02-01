import { Bundle } from '../bundle'
import { callsite } from '../callsite'


describe(Bundle, () => {
  test('has a static stack with a current.', () => {
    const a = new Bundle()
    expect(Bundle.current).toBe(a)

    const b = new Bundle()
    expect(Bundle.current).toBe(b)

    b.close()
    expect(Bundle.current).toBe(a)

    a.close()
  })

  test('collects entries.', () => {
    const bundle = new Bundle()
    const site = callsite()

    bundle.collect(site[0]!)
    expect(bundle.entries).toEqual([site[0]])
  })

  test('closes.', () => {
    const bundle = new Bundle()
    bundle.close()
    bundle.collect(callsite()[0]!)

    expect(bundle.closed).toBe(true)
    expect(bundle.entries).toEqual([])
  })

  test('resolves duplicates.', () => {
    const bundle = new Bundle()

    function f() {
      const siteA = callsite()[0]!
      const siteB = callsite()[0]!

      bundle.collect(siteA)
      bundle.collect(siteB)
    }

    function g() {
      bundle.collect(callsite()[0]!)
    }

    f()
    g()

    expect(bundle.entries.length).toBe(2)
    expect(bundle.entries[0]!.getFunctionName()).toBe('f')
    expect(bundle.entries[1]!.getFunctionName()).toBe('g')
  })
})
