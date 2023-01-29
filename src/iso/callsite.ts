export function callsite() {
  const originalFunc = Error.prepareStackTrace
  const err = new Error() as Error & { stack: NodeJS.CallSite[] }
  Error.prepareStackTrace = function (_, stack) { return stack }
  const trace = err.stack.slice(1) as unknown as NodeJS.CallSite[]

  Error.prepareStackTrace = originalFunc

  return trace
}
