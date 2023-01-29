import { packMe, packCaller, Bundle } from '../'
import { packCallerTest } from './helper'


describe(packMe, () => {
  test('packs current callsite into bundle.', () => {
    const bundle = new Bundle()
    packMe()
    bundle.close()

    expect(bundle.entries).toHaveLength(1)
    expect(bundle.entries[0]!.getFileName()).toBe(__filename)
  })

  test('does nothing when there is no active bundle.', () => {
    expect(() => packMe()).not.toThrow()
  })
})


describe(packCaller, () => {
  test('packs caller callsite into bundle.', () => {
    const bundle = new Bundle()
    packCallerTest()
    bundle.close()

    expect(bundle.entries).toHaveLength(1)
    expect(bundle.entries[0]!.getFileName()).toBe(__filename)
  })

  test('does nothing when there is no active bundle.', () => {
    expect(() => packCaller()).not.toThrow()
  })
})
