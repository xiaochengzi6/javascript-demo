// 参考文章：https://github.com/mqyqingfeng/Blog/issues/43

// 偏函数：多参函数中局部固定参数然后产生更小参数的函数

// 类似于 bind() 函数的效果

// fn.bind(this, value_1, value_2) => _fn(value_3, value_4) === Result_function(value_1, value_2, value_3, value_4)

// 简单的 bind 函数
function mybind(fn, context, ...args) {
  return function (...params) {
    var _args = [...args, ...params]
    fn.apply(context, _args)
  }
}

// test
var obj = {}

var fn = function (a, b, c, d) {
  console.log([a, b, c, d])
}

var _fn = mybind(fn, obj, 'a', 'b')
_fn('c', 'd') // [ 'a', 'b', 'c', 'd' ]

// 柯里化和偏函数(局部应用函数) 的区别？

// 1. 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。

// 2. 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。

// 如果宏观来看 bind() 函数可以等同于偏函数

// 实现一个带有占位符的偏函数  ( _, 20 )(5) => (5, 20)

function partial(fn, holder = partial, ...args) {
  return function (...params) {
    var _args = args,
      _params = params,
      values

    if (_args.every((i) => i !== holder)) {
      _args.map((arg, i) => {
        if (arg === holder) {
          arg = _params.shift()
        }
      })
      values = [..._args, ..._params]
    } else {
      value = [...args, ...params]
    }
    return fn.apply(this, values)
  }
}

// 空间复杂度过高优化后

function partial(fn, holder = partial, ...args) {
  return function (...params) {
    args.map((arg, i) => {
      if (arg === holder) {
        arg = _params.shift()
      }
    })
    return fn.call(this, ...args, ...params)
  }
}

// 完全使用 es6

function partial(fn, holder = partial, ...args) {
  return function (...params) {
    return fn.call(this, ...args.map((arg) => (arg === holder ? (arg = params.shift()) : arg)), ...params)
  }
}

let _ = {}

var subtract = function (a, b) {
  return b - a
}
subFrom20 = partial(subtract, _, 20)
console.log(subFrom20(5))
