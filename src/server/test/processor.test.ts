import { bareImport } from '../processor'
import { noExt, relativeTo } from '../util'
import { callsite } from '../../iso'


describe(bareImport, () => {
  test('returns import statement for current callsite.', () => {
    const entry = callsite()[0]!
    const res = bareImport()(entry)

    expect(res).toBe(`import '${noExt(__filename)}'`)
  })

  test('returns import statement for current callsite with extension.', () => {
    const entry = callsite()[0]!
    const res = bareImport({ includeExtensions: true })(entry)

    expect(res).toBe(`import '${__filename}'`)
  })

  test('returns import statement for current callsite relative to root.', () => {
    const entry = callsite()[0]!
    const res = bareImport({ importRoot: __dirname })(entry)

    expect(res).toBe(`import '${relativeTo(noExt(__filename), __dirname)}'`)
  })
})
