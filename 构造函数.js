// 存在的问题 global、 window 不存在的时候就会抛出错误

// 实现 call
Function.prototype.myCall = function (thisObj) {
  if (!thisObj && (window || global)) {
    thisObj = window ? window : global
  }
  thisObj = Object(thisObj)
  const key = Math.random().toString(36).slice(2)
  const symbolsValue = Symbol(key)
  thisObj[symbolsValue] = this
  const args = [...arguments].slice(1)
  const value = thisObj[symbolsValue](...args)
  delete thisObj[symbolsValue]
  return value
}

// 实现 apply
Function.prototype.myApply = function (thisObj, args) {
  if (!thisObj && (window || global)) {
    thisObj = window ? window : global
  }
  if (Array.isArray(args)) {
    return new TypeError('参数不是数组')
  }
  thisObj = Object(thisObj)
  const key = Math.random().toString(32).slice(2)
  const symbolValue = Symbol(key)
  thisObj[symbolValue] = this
  const value = thisObj[symbolValue](...args)
  delete thisObj[symbolValue]
  return value
}

// Array.isArray()
function isArray(targetObj) {
  if (
    targetObj &&
    typeof targetObj === 'object' &&
    targetObj.length >= 0 &&
    targetObj.length === Math.floor(targetObj.length) &&
    targetObj.length < Math.pow(2, 32)
  ) {
    return true
  }
  return false
}

// 函数的剩余参数能否结构 arguments
function restFunc() {
  const arg = arguments

  function a(...arg) {
    return arg
  }
  return a(arg)
}
// console.log(restFunc(1, 2, 3, 4, 5)) // [Arguments(5)]
// 解析不了

// 函数的剩余参数和 arguments 的区别
// 1、函数的剩余参数解析的是函数中没有形参对应的实参， arguments 得到的函数中所有的实参
// 2、剩余参数是真数组可以使用数组的方法，arguments 是伪数组

// 值得注意: 函数的参数添加 ... 这种剩余参数 会将参数使用数组包裹起来，在函数内使用 ... 指的的是解析该数组（被包裹的参数数组）
// 演示：
function rest_1(...arg) {
  console.log('1： ', ...arg)
  console.log('2: ', arg)
}
// rest_1([1,2])

// 实现 bind()
Function.prototype.myBind = function (context) {
  if (!context) {
    context = window
  }
  context = Object(context)
  const key = Math.random().toString(32).slice(2)
  const symbolValue = Symbol(key)
  const arg = [...arguments].slice(1)
  context[symbolValue] = this

  function q(...args) {
    console.log('this', this)
    return context[symbolValue](arg, ...args)
  }
  q.prototype = this.prototype
  return q
}

// 这里出现的问题就是不能做为构造函数调用， 原因：由于这里是固定了this 也就是 foo 的 this ，但 foo 是一个对象他的 this 指向外层，

// 关于 bind() 返回的绑定对象：绑定函数使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// bind() 优化
Function.prototype.myBind = function (context) {
  if (!context) {
    context = window
  }
  context = Object(context)
  const _self = this

  function b(...args) {
    _self.call(this instanceof b ? this : _self, ...args)
  }

  b.prototype = this.prototype
  return b
}

// 值得注意的是 绑定函数没有原型，[但没有原型无法 new 猜测里面应该是做了 get/set 类型]
// 这里去尝试用 get/set 去模仿没有写出来无奈放弃。

// 最终版 bind() 函数
Function.prototype.myBind = function (context) {
  if (!context) {
    context = window
  }
  context = Object(context)
  const _self = this

  const obj = Object.create(null)

  function b(...args) {
    _self.call(this instanceof b ? this : _self, ...args)
  }
  obj.prototype = this.prototype
  b.prototype = obj
  return b
}
