var obj = function (value) {
  if (!(this instanceof obj)) return new obj(value)
  this.wrapped = value
}

obj.functions = function () {
  return 1
}

obj.prototype.functions = obj.functions

console.log(obj.prototype.functions())
