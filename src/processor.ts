import { noExt, relativeTo } from './util'


export type Processor = (entry: NodeJS.CallSite) => string


export interface BareImportOptions {
  importRoot?: string
  includeExtensions?: boolean
}


export const bareImport = (options?: BareImportOptions) => (entry: NodeJS.CallSite) => {
  let res = entry.getFileName()!

  !options?.includeExtensions && (res = noExt(res))
  options?.importRoot &&  (res = relativeTo(res, options.importRoot))

  return `import '${res}'`
}
