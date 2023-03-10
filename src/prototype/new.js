// 返回值
// 1. 如果构造函数没有显式的返回值，那么返回this
// 2. 如果构造函数有显式的返回值，是基本类型，number string boolean，那么还是返回this
// 3. 如果构造构造函数有显式的返回值，是对象类型，返回这个对象

function newObj() {
  let o = Object.create(null)
  let FunctionConstructor = [].shift.call(arguments)
  o.__proto__ = FunctionConstructor.prototype
  let resultObj = FunctionConstructor.apply(o, arguments)
  return typeof resultObj === 'object' ? resultObj : o
}