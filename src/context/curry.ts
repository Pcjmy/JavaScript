function curry(fn: Function) {
  const fnArgsLength = fn.length
  let args: any[] = []

  function calc(this: any, ...newArgs: any[]) {
    args = [
      ...args,
      ...newArgs
    ]
    if (args.length < fnArgsLength) {
      return calc
    } else {
      return fn.apply(this, args.slice(0, fnArgsLength))
    }
  }

  return calc
}

function add(a: number, b: number, c: number): number {
  return a+b+c;
}

const curryAdd = curry(add)
curryAdd(10)(20)(30);