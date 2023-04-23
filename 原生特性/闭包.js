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
var a = 'a'
function fn_1() {
  console.log(a)
}

fn_1() // a

// 自由变量是除了函数内自己声明变量以外的变量

// 但这是理论上的闭包，不过这也确实是闭包的概念毕竟函数只要引用到了外层的自由变量就可以被称之为闭包

// 从实践角度：以下函数才算是闭包：
// 1、即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
// 2、在代码中引用了自由变量

//todo 闭包所解决的问题：1. 2.
// 1. 在函数执行完后当前的函数执行上下文就会被弹出执行上下文栈但子函数要是引用到父函数的变量就会出现问题
function foo() {
  var a = 1
  return function foo_1() {
    console.log(a)
  }
}
var y = foo()
console.log('y', y)
//如果这里父函数执行完后销毁 那么子函数就会抛错，这样的行为坑定不对

// 2. 当系统采用动态作用域，函数通过参数传递
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

var a = function a() {}
var a = 1

// todo 如果采用动态作用域的方式去查找标识符就会导致参数函数在不同函数内被调用时取值各不相同

// 闭包 = 当前代码块和创建代码块上下文中数据的结合

// 结合着实际代码来描述以下闭包中存储了什么数据
function bu() {
  var a = 1
  var b = 2
  function foo_1() {
    console.log(a)
  }
  return foo_1
}
var t = bu()
t()
// 首先执行 foo 函数 创建了foo 的函数执行上下文然后保存在执行上下文栈中执行，碰到 `return`
// 后 foo 函数被执行完 从执行上下文栈弹出 foo 的函数执行上下文 但是由于 foo_1 子函数引用到了
// 自由变量 a 所以就将 foo_1 所需要的变量沿着作用域链过滤出来并保存在堆中，该函数的属性 [[scopes]]
// 持有这个引用

// 之前也看到 【作用域.js】中写到函数在创建的时候就会创建一个 [[scopes]] 的函数属性从而存有父变量对象的层级链

// 这里要区分 函数的闭包是怎么产生的，是引用到自由变量的时候还是直接通过 [[scopes]] 保存起来

// 1

function func_test_1() {
  var a = 1
  function n() {
    console.log(a)
  }
  return n
}
var func_test_1_n = func_test_1()
func_test_1_n()

// 2

function func_test_1() {
  var a = 1
  function n() {
    console.log('aaa')
  }
  return n
}

var func_test_1_n = func_test_1()
func_test_1_n()

// 这里去打断点调试了这两段代码发现 闭包是函数使用到自由变量才会被创建然后存放在 [[scopes]] 下

// 可以搭配着 函数的作用域去看


// 2023.4.20 
// 这里其实还有点问题
// 理论上所有的函数都可以被认为是闭包函数，原因是函数在创建的时候函数的内部熟悉 [[scope]] 持有对外层作用域的应用
// 其实这里就产生了闭包，理论上的闭包就是可以访问自由变量的函数

// 实际上对闭包的定义是
// 1. 创建它的上下文被销毁，但它任然存在
// 2. 使用到了自由变量

