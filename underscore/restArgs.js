// est5 环境下对于参数的解决方法

// 需要使用 restArgs 优化的函数
function partial(fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// 使用 rest 参数
function partial(fn, ...args) {
  return function (...partialArgs) {
    var _Args = args.concat(partialArgs)
    return fn.apply(this, _Args)
  }
}

// es5 环境下模仿 rest 参数
function restArgs(fn) {
  return function () {
    var startIndex = fn.length - 1
    var length = arguments.length - startIndex

    var rest = Array(length)
    var index = 0

    for (; index < length; index++) {
      rest[index] = arguments[startIndex + index]
    }

    var args = Array(startIndex + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest

    return fn.apply(this, args)
  }
}

// 等同于

function _restArgs(fn, ...args) {
  return fn.apply(this, args)
}

// restArgs 返回的函数主要用于接收参数进而处理，可以理解为在外层包裹了一层处理传入的参数

// 核心思想：
// ----------0, 1, 2, 3, 4, 5
// arguments(a, b, c, d, e, f)
// ----------0, 1, 2, startIndex(3), 4, EndIndex(5)

// rest ==> [startIndex, ...., EndIndex]
// args ==> [0, 1, 2, rest]

// 最后: return fn.apply(this, args)

// 代码逻辑优化

/**
 * @param {*} fn 回调函数
 * @param {*} startIndex 指定从那个位置开始描述剩余参数 rest
 */
function restArgs(fn, startIndex) {
  startIndex = startIndex == null ? fn.length - 1 : +startIndex
  return function () {
    var length = Math.max(arguments.length - startIndex, 0)
    var rest = Array(length)
    var index = 0

    // 循环后存储 rest
    for (; index < length; index++) {
      rest[index] = arguments[startIndex + index]
    }

    // 组合 rest 参数的参数
    var args = Array(length + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest

    return fn.apply(this, args)
  }
}

// 性能优化
function restArgs(fn, startIndex) {
  startIndex = startIndex == null ? fn.length - 1 : +startIndex
  return function () {
    var length = Math.max(arguments.length - startIndex, 0)
    var rest = Array(length)
    var index = 0

    for (; index < length; index++) {
      rest[index] = arguments[startIndex + index]
    }

    // 使用 call 比使用 apply 性能要高
    // restArgs 外层的 startIndex 用于指定返回函数 rest 的起始位
    switch (startIndex) {
      case 0:
        return fn.call(this, rest)
      case 1:
        return fn.call(this, arguments[0], rest)
      case 2:
        return fn.call(this, arguments[0], arguments[1], rest)
    }

    var args = Array(length + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest

    return fn.apply(this, args)
  }
}

// 这里使用了 es5 版的 partial 函数
var partial = restArgs(function a(fn, args) {
  return restArgs(function b(partialArgs) {
    console.log(typeof args)
    var _args = args.concat(partialArgs)
    return fn.apply(this, _args)
  })
})

var addValue = function (a, b, c) {
  var result = a + b + c
  console.log(result)
  return result
}
var fn = partial(addValue, 1)
fn(2, 3)

// 这里使用 restArgs 对 a 函数的参数处理后返回了一个 包裹了 a 函数的函数
