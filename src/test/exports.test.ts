import {
  callsite, Bundle, packMe, packCaller,
  BareImportOptions, bareImport, Processor,
  serialize, write

} from '../'


test('everything is exported', () => {
  expect(callsite).toBeDefined()
  expect(Bundle).toBeDefined()
  expect(packMe).toBeDefined()
  expect(packCaller).toBeDefined()
  expect(bareImport).toBeDefined()
  expect(<BareImportOptions>{}).toBeDefined()
  expect(<Processor>{}).toBeDefined()
  expect(serialize).toBeDefined()
  expect(write).toBeDefined()
})



