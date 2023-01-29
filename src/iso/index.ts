export * from './callsite'
export * from './bundle'


import { callsite } from './callsite'
import { Bundle } from './bundle'


export function packMe() {
  const site = callsite()[1]
  site && Bundle.current?.collect(site)
}


export function packCaller() {
  const site = callsite()[2]
  site && Bundle.current?.collect(site)
}
