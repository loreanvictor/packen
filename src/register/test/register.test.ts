import { join } from 'path'
import { unlink, readFile } from 'fs/promises'
import { cd, exec } from 'shelljs'


describe('register', () => {
  test('automatically builds a bundle after other node events are done.', async () => {
    cd(join(__dirname, '.test-pack'))
    exec('PACKEN_TO=/tmp/.prbundle.js ts-node -r ../../index ./foo')

    const content = await readFile('/tmp/.prbundle.js', 'utf8')
    expect(content).toContain('Ladida')
    await unlink('/tmp/.prbundle.js')
  })
})
