function curry(fn) {
  const fnArgsLength = fn.length
  let args = []

  function calc(...newArgs) {
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

function add(a, b, c) {
  return a+b+c;
}

const curryAdd = curry(add)
let ans = curryAdd(10)(20)(30)
console.log(ans)