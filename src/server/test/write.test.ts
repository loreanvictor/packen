import { readFile, unlink } from 'fs/promises'
import { Bundle } from '../../iso'
import { serialize, write } from '../write'


describe(serialize, () => {
  test('returns stringified bundle.', () => {
    const bundle = {
      close: jest.fn(),
      entries: [
        { getFileName: () => 'foo' },
        { getFileName: () => 'bar' },
      ],
    } as unknown as Bundle

    expect(serialize(bundle)).toBe('import \'foo\'\nimport \'bar\'')
    expect(bundle.close).toBeCalledTimes(1)
  })
})


describe(write, () => {
  test('writes bundle to file.', async () => {
    const bundle = {
      close: jest.fn(),
      entries: [
        { getFileName: () => 'foo' },
        { getFileName: () => 'bar' },
      ],
    } as unknown as Bundle

    await write(bundle, '/tmp/write.test.ts')
    const contents = await readFile('/tmp/write.test.ts', 'utf8')
    await unlink('/tmp/write.test.ts')

    expect(contents).toBe('import \'foo\'\nimport \'bar\'\n')
    expect(bundle.close).toBeCalledTimes(1)
  })
})
