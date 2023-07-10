import { callsite } from './callsite'
import { Bundle } from './bundle'


export function mark() {
  return callsite()[1]
}


export function markCaller() {
  return callsite()[2]
}


export function collect(site: NodeJS.CallSite | undefined) {
  site && Bundle.current?.collect(site)
}
