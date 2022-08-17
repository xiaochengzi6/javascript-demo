// 参考文章：https://juejin.cn/post/6844903882208837645

// 柯里化的概念：
// 是将使用多个参数的一个函数转换成使用一个参数的函数的技术

// 函数柯里化的核心：
// 接受参数，参数达到相应个数时候就可以去执行原函数

// 降低通用性，提高适配性

// 有两种思路：

// 1 通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
// 2 在调用柯里化工具函数时，手动指定所需的参数个数

// 方法一

function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params]
    if (_args.length >= len) {
      return fn.apply(this, _args)
    } else {
      return _curry.call(this, fn, len, ..._args)
    }
  }
}

var _fn = curry(function (a, b, c, d, e) {
  let sum = a + b + c + d + e
  console.log(sum)
})

_fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
_fn(1)(2)(3, 4, 5) // print: 1,2,3,4,5
_fn(1, 2)(3, 4)(5) // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5) // print: 1,2,3,4,5

// 方法

function curry(fn, len) {
  return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args) {
  return function (...params) {
    var value = [...args, ...params]
    if (value.length >= len) {
      return fn.apply(this, value)
    } else {
      return _curry.call(this, fn, len, ...args)
    }
  }
}

var _fn = curry(function (a, b, c, d, e) {
  let sum = [a, b, c, d, e]
  console.log(sum)
}, 5)

_fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
_fn(1)(2)(3, 4, 5) // print: 1,2,3,4,5
_fn(1, 2) // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5) // print: 1,2,3,4,5

// 模仿 lodash 的占位柯里化函数
// (1)(2)(3) => [1,2,3]
// (1)(_, 2)(3) => [1,3,2]

function curry(fn, length = fn.length, holder = curry) {
  return _curry.call(this, fn, length, holder, [], [])
}

function _curry(fn, length, holder, args, holders) {
  return function (..._args) {
    let params = args.slice()
    let _holders = holders.slice()

    _args.forEach((arg, i) => {
      // 不存在占位符且占位符有记录
      if (arg !== holder && holders.length) {
        let index = holders.shift()
        _holders.splice(_holders.indexOf(index), 1)
        params[index] = arg
      }
      // 不存在占位符且占位符没有记录
      else if (arg !== holder && !holders.length) {
        params.push(arg)
      }
      // 存在占位符且占位符没有记录
      else if (arg === holder && !holders.length) {
        params.push(arg)
        _holders.push(params.length - 1)
      }
      // 存在占位符且占位符有记录
      else if (arg === holder && holders.length) {
        holders.shift()
      }
    })
    // params 中没有占位符才能执行函数
    if (params.length >= length && params.slice(0, length).every((i) => i !== holder)) {
      return fn.apply(this, params)
    } else {
      return _curry.call(this, fn, length, holder, params, _holders)
    }
  }
}

// 函数柯里化抽离方法

// 问题1
let arrays = [{ name: 1 }, { name: 2 }]

arrays.forEach((ele, i) => {
  console.log(ele.name)
})

// 答：
let proto = curry(function proto(key, obj) {
  console.log(obj[key])
})
arrays.forEach(proto('name'))
