// 参考文章：https://juejin.cn/post/6844903882208837645

// 柯里化的概念：
// 是将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

// 函数柯里化的核心：
// 接受参数，参数达到相应个数时候就可以去执行原函数

// 降低通用性，提高适配性

// 有两种思路：

// 1 通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
// 2 在调用柯里化工具函数时，手动指定所需的参数个数

// 简单版
function compose(fn) {
  if (typeof fn !== 'function') {
    throw TypeError('fn is no function')
  }
  let length = fn.length
  const args = []

  const cycel = (length) => {
    if (length == 0) {
      return fn(...args)
    }

    return (value) => {
      args.push(...value)
      return cycel(--length)
    }
  }

  return cycel(length)
}

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
      // 递归调用
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

// 方法 2

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

/**
 * @param {*} fn 回调函数
 * @param {*} [length=fn.length] 回调函数所需要参数的数量
 * @param {*} [holder=curry] 占位符
 */
function curry(fn, length = fn.length, holder = curry) {
  return _curry.call(this, fn, length, holder, [], [])
}

/**
 *
 * @param {*} fn 回调函数
 * @param {*} length 回调函数参数的长度
 * @param {*} holder 占位符
 * @param {*} args 接收参数数组
 * @param {*} holders 占位符数组
 * @return {*}
 */
function _curry(fn, length, holder, args, holders) {
  return function (..._args) {
    let params = args.slice()
    // 代表这次的占位符数组
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
let fn = function (a, b, c, d, e) {
  console.log([a, b, c, d, e])
}

let _ = {} // 定义占位符
let _fn = curry(fn, 5, _) // 将函数柯里化，指定所需的参数个数，指定所需的占位符

_fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
_fn(_, 2, 3, 4, 5)(1) // print: 1,2,3,4,5
_fn(1, _, 3, 4, 5)(2) // print: 1,2,3,4,5
_fn(1, _, 3)(_, 4, _)(2)(5) // print: 1,2,3,4,5
_fn(1, _, _, 4)(_, 3)(2)(5) // print: 1,2,3,4,5
_fn(_, 2)(_, _, 4)(1)(3)(5) // print: 1,2,3,4,5

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

function compose(fn) {
  if (typeof fn !== 'function') {
    throw TypeError('fn is no function')
  }
  let length = fn.length
  const args = []

  const cycel = (length) => {
    if (length == 0) {
      const lastIndex = args.findLastIndex(ele => ele === '_')
      const rep = args.filter(ele => ele === '_')

      if(args.length - lastIndex < rep.length){
        throw TypeError('传入的参数不够替换的')
      }

      if(!~lastIndex){
        rep.forEach(ele => {
          // 其实这里是有问题的 它只能确保在 [_, _, _, 1, 3, 5] 这样的方式去进行替换
          // 比如[_, 1, _, 3, 5] 这就不行了
          args[ele] = args[lastIndex + ele] 
        })           
      }

      return fn(...args)
    }

    return (value) => {
      args.push(value)
      return cycel(--length)
    }
  }

  return cycel(length)
}
const test = (a, b, c, d) => a + b + c + d

const _fn = compose(test)

console.log(_fn(1, 2, 3, 4, 5) )
console.log(_fn(_, 2, 3, 4, 5)(1) )
console.log(_fn(1, _, 3, 4, 5)(2) )
console.log(_fn(1, _, 3)(_, 4, _)(2)(5) )
console.log(_fn(1, _, _, 4)(_, 3)(2)(5) )
console.log(_fn(_, 2)(_, _, 4)(1)(3)(5) )