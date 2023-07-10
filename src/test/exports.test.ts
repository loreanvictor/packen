import { callsite, Bundle, packMe, packCaller, mark, markCaller, collect } from '../'


test('everything is exported', () => {
  expect(callsite).toBeDefined()
  expect(Bundle).toBeDefined()
  expect(packMe).toBeDefined()
  expect(packCaller).toBeDefined()
  expect(mark).toBeDefined()
  expect(markCaller).toBeDefined()
  expect(collect).toBeDefined()
})
