/**
 * 自应用函数
 */
;(function selfApplicative(funArg) {
  if (funArg && funArg === selfApplicative) {
    console.log('self-applicative')
    return
  }

  selfApplicative(selfApplicative)
})()

/**
 * 自复制函数
 */
;(function selfApplicative() {
  return selfApplicative
})()

// 场景：可以用于链式调用

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
