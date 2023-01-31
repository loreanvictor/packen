import {
  BareImportOptions, bareImport, Processor,
  serialize, write
} from '../'


test('everything is exported', () => {
  expect(bareImport).toBeDefined()
  expect(<BareImportOptions>{}).toBeDefined()
  expect(<Processor>{}).toBeDefined()
  expect(serialize).toBeDefined()
  expect(write).toBeDefined()
})



