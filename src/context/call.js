Function.prototype.MyCall = (context, ...args) => {
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new contextect(context)
  let key = Symbol()
  context[key] = this
  let res = context[key](...args)
  delete context[key]
  return res
}

function print() {
  console.log(this.name)
}

let obj = {
  name: 'zhangsan'
}

print.call(obj)