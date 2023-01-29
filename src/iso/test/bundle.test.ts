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
})
