/**
 * this 的方式一共有四种
 * 1. 默认绑定
 * 2. 显示绑定
 * 3. 隐式绑定
 * 4. new 绑定
 * 
 * github笔记：https://github.com/xiaochengzi6/Blog/issues/4
 */

// 按照优先级排列
// 1. new 绑定
function Foo (name){
  this.name = name 
}

new foo = new Foo('builre')

// 2. 显示绑定
// 使用 call or apply 
// 这两者唯一的不同就是参数的传入方式不同
// call(context, arg1, arg2, arg3,...)
// apply(context, [arg1, arg2, arg3, ...])

// 使用显示绑定还有一个硬绑定，就是绑定的函数的 this 不会发生改变
function my_bind(name){
  this.name = name
}

const my_bing_obj = {
  name: 'bing_obj'
}

const bindFunc = my_bind.bind(my_bind_obj)

// 3. 隐式绑定


// 4. new 绑定



// 特别的
// 1. 如果使用 bind call apply 传入参数 context: null or undefiend 就会为默认绑定
function build() {
  return this.a
}

var a = 'build'

var bid = build.call(undefined) // or bunid.call(null)

