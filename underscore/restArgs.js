// value == null 既可以排除undefined又可以排除null

// es5环境下实现 rest 参数 function (a, b, c, ...args) {} ==> restArgs(function(a, b, c, d, e, f){ rest = [d, e, f] })

// ----------0, 1, 2, 3, 4, 5
// arguments(a, b, c, d, e, f)
// ----------0, 1, 2, startIndex(3), 4, EndIndex(5)

// rest ==> [startIndex, ...., EndIndex]
// args ==> [0, 1, 2, rest]

// function restArgs(func) {
//   return function () {
//     var startIndex = func.length - 1
//     var length = arguments.length - startIndex

//     var rest = Array(length)
//     var index = 0

//     for (; index < length; index++) {
//       rest[index] = arguments[index + startIndex]
//     }

//     var args = Array(startIndex + 1)
//     for (index = 0; index < startIndex; index++) {
//       args[index] = arguments[index]
//     }

//     args[startIndex] = rest

//     return func.apply(this, args)
//   }
// }

// 由于函数的参数并没有强制性所以 startIndex 也有可能是 负数
// 增加一个参数指定 startIndex ,如果没有就默认最后一个

function restArgs(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex
  return function () {
    var length = Math.max(arguments.length - startIndex, 0)
    var rest = Array(length)
    var index = 0

    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex]
    }

    // 增加这一步是为了提高性能
    switch (startIndex) {
      case 1:
        return func.call(this, rest)
      case 2:
        return func.call(this, arguments[0], rest)
      case 3:
        return func.call(this, arguments[0], arguments[1], rest)
    }

    var args = Array(startIndex + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }

    args[startIndex] = rest
    return func.apply(this, args)
  }
}

// console.log(
//   restArgs(function func(a, b, c, d, e, f, g, h, i, j, k, m, n) {
//     return void 0
//   }, 5)(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
// )

// var restArgs = function (func, startIndex) {
//   startIndex = startIndex == null ? func.length - 1 : +startIndex
//   return function () {
//     var length = Math.max(arguments.length - startIndex, 0),
//       rest = Array(length),
//       index = 0

//     for (; index < length; index++) {
//       rest[index] = arguments[index + startIndex]
//     }

//     // 增加的部分
//     switch (startIndex) {
//       case 0:
//         return func.call(this, rest)
//       case 1:
//         return func.call(this, arguments[0], rest)
//       case 2:
//         return func.call(this, arguments[0], arguments[1], rest)
//     }

//     var args = Array(startIndex + 1)
//     for (index = 0; index < startIndex; index++) {
//       args[index] = arguments[index]
//     }

//     args[startIndex] = rest
//     return func.apply(this, args)
//   }
// }

// 有问题 -- 调用关系 传参是怎么传的没搞懂
var partial = restArgs(function (fn, args) {
  return restArgs(function (partialArgs) {
    var newArgs = args.concat(partialArgs)
    return fn.apply(this, newArgs)
  })
})

function add(a, b, c) {
  return a + b + c
}

var addOne = partial(add, 1)
console.log(addOne(2, 3)) // 6
