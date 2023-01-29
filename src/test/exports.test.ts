import {
  callsite, Bundle, packMe, packCaller,
  sideEffectImport, SideEffectImportOptions, Processor,
  serialize, write

} from '../'


test('everything is exported', () => {
  expect(callsite).toBeDefined()
  expect(Bundle).toBeDefined()
  expect(packMe).toBeDefined()
  expect(packCaller).toBeDefined()
  expect(sideEffectImport).toBeDefined()
  expect(<SideEffectImportOptions>{}).toBeDefined()
  expect(<Processor>{}).toBeDefined()
  expect(serialize).toBeDefined()
  expect(write).toBeDefined()
})



