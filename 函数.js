/**
 * 自应用函数
 */
 (function selfApplicative(funArg) {

  if (funArg && funArg === selfApplicative) {
    console.log('self-applicative');
    return;
  }

  selfApplicative(selfApplicative);

})();


/**
 * 自复制函数
 */
(function selfApplicative() {
  return selfApplicative
})()

// 特点；可以让仅接收集合一个参数的来接收集合本身
function registerMode(target) {
  console.log(target)
}

function registerModes(modes) {
  modes.forEach(registerMode, modes)
}

registerModes([1, 2, 3])

// 最常用的遍历方法是这样的 但是以后可以使用这样的方式遍历
const modes = [1, 2, 3]
modes.forEach((ele) => console.log(ele))

// 函数的链式调用

function logValue(mode) {
  registerMode(mode)
  return logValue
}

logValue('eeeee')('ewweeew')('sdsdasd')

var z = 10

function foo() {
  console.log(z)
}

foo() // 10 – 使用静态和动态作用域的时候
;(function () {
  var z = 20
  let a = foo // 10 – 使用静态作用域, 20 – 使用动态作用域
  a() // 10 – 使用静态作用域, 20 – 使用动态作用域
})()

// 将foo作为参数的时候是一样的
;(function (funArg) {
  var z = 30
  funArg() // 10 – 静态作用域, 30 – 动态作用域
})(foo)



