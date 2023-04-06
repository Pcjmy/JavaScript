Function.prototype.MyBind = (context, ...bindArgs) => {
  let self = this
  return function(...args) {
    let newArgs = bindArgs.concat(args)
    return self.apply(context, newArgs)
  }
}