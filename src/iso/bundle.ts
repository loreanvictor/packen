export class Bundle {
  static _stack: Bundle[] = []
  static get current() {
    return this._stack[this._stack.length - 1]
  }

  entries: NodeJS.CallSite[] = []
  closed = false

  constructor() {
    Bundle._stack.push(this)
  }

  close() {
    this.closed = true
    Bundle._stack.pop()
  }

  collect(entry: NodeJS.CallSite) {
    if (!this.closed) {
      if (!this.entries.some(e =>
        e.getFileName() === entry.getFileName()
        && e.getFunctionName() === entry.getFunctionName()
      )) {
        this.entries.push(entry)
      }
    }
  }
}
