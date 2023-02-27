function Foo(name) {
  this.name=name
  this.city='北京'
}

Foo.prototype.getName = function() {
  return this.name
}

const f = new Foo('Pcjmy')
console.log(f.getName());