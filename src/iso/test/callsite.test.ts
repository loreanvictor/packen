import { callsite } from '../callsite'


describe(callsite, () => {
  test('provides callsites.', () => {
    const site = callsite()

    expect(site[0]!.getFileName()).toBe(__filename)
  })
})
