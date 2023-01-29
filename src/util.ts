import { parse, join, relative } from 'path'


export function noExt(path: string) {
  const { name, dir } = parse(path)

  return join(dir, name)
}


export function relativeTo(path: string, root: string) {
  let res = path

  res = relative(root, res)
  if (!res.startsWith('.')) {
    res = `./${res}`
  }

  return res
}
