// 参考文章：https://github.com/mqyqingfeng/Blog/issues/9

// 我之前对闭包的浅薄理解：闭包是可以访问外部变量的函数在其他位置被引用后调用，这个调用就可以称之为产生闭包

function func_1() {
  let a = 1
  function func_2() {
    a = 2
    console.log(a)
  }
  return func_2
}
const f2 = func_1()
f2() // 2

// 事实上确实也是这样但是这样理解不够全面或者说这只是闭包的子集

// 正确的解释：闭包是使用能够访问自由变量的函数
let a = 'a'
function fn_1() {
  console.log(a)
}

fn_1() // a

// 自由变量是除了函数内自己声明变量以外的变量

// 但这是理论上的闭包，不过这也确实是闭包的概念毕竟函数只要引用到了外层的自由变量就可以被称之为闭包

// 从实践角度：以下函数才算是闭包：
// 1、即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
// 2、在代码中引用了自由变量

// 闭包
data = []
for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    var j = i
    return function () {
      console.log(j)
    }
  })(i)
}
data[0]()
data[1]()
data[2]()

// 接受集合的函数
function registerMode(name) {
  console.log(name)
}

// function registerModes(modes) {
//   modes.forEach(registerMode, modes)
// }

// // 用法
// registerModes(['roster', 'accounts', 'groups'])

// 自复制函数的声明
function modes(mode) {
  registerMode(mode) // 注册一个mode
  return modes // 返回函数自身
}

// 用法，modes链式调用
modes('roster')('accounts')('groups')
