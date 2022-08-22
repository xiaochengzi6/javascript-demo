// 内存泄漏的核心原因在于：没有进行垃圾回收
// 常见的场景：闭包

// 这也是闭包
function func() {
  const array = new Array(19)
  return function () {
    console.log('ssssss')
  }
}

// 问题1：全局作用域下的 let const 绑定在什么上面

// 答：全局作用域下的 let const 变量的声明绑定在 script块作用域

// 问题2：当 html 加载的时候 script 时如何解析的 代码都交给了谁处理处理的具体内容是什么，

// 参考文章：【修复 Web 应用程序中的内存泄漏】https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/
// 【你的程序中可能存在内存泄漏】https://juejin.cn/post/6984188410659340324#comment

// 一、出现的成因
// 内存泄漏的成因是源于使用了 spa 模式的web应用 spa单页面应用路由以及状态的管理是消耗内存的主要成因
// 进行路由跳转是触发了 url 的变化而 js 能够监听到这类的变化在页面是卸载某些 dom 在添加相应的 dom
// 从而确保路由的变化带动页面的展示路由的跳转简单的说就是在同一个 html 页面中 dom 的的卸载和添加
// 这类模式下的状态都存在一个或者说是全局中，这一点很好不同页面之间的状态管理相较于简单，但是状态都存储在一个容器下
// 复杂性和不确定性就会随应用不停的迭代逐步升高以至于下一个维护者需要更长时间去理解才能较好的维护该应用
// 不好的编程习惯又会造就本来内存使用量就高的应用卡顿甚至崩溃，

// 二、如何判断

// 内存泄漏 = 占用内存 + 永不gc
// 常见的场景如以下：
// dom 事件的监听：
window.addEventListener('message', this.onmessage.bind(this))
// 比如这段代码它就明显的造成了内存泄漏，始终对事件有一个监听函数，并且还持有 this 的引用关系，
// 由于一直持有对其的引用关系 浏览器也就不会去进行垃圾回收处理 从而造成内存泄漏
// 全局变量
function func() {
  NAME = 'NAME'
}
// 显而易见的是 NAME 的变量声明是全局的会被绑定到 window 对象上 一直持有 除非主动的去清空引用不然没有办法通过 gc 去消除
// 不仅是没有使用变量声明的操作符申明变量在全局作用域下使用 let const var function 等这些都会存储在全局中作为全局变量
// 成为全局变量后，浏览器就不会轻易的经行垃圾回收，占用一直持有，内存泄漏就随之而来了

// 这里去引用下其他文章的内容
// 1、addEventListener. 这是最常见的一种。需要使用 removeEventListener 清理。
// 2、setTimeout/ setInterval。clearTimeout如果您创建一个循环计时器（例如每 30 秒运行一次），
//   那么您需要使用或清理它clearInterval。（setTimeout如果使用它可能会泄漏 setInterval
//   即在回调setTimeout内部安排一个新的。）setTimeout
// 3、IntersectionObserver, ResizeObserver, MutationObserver, 等等。这些新的 API 非常方便，但也有可能泄漏。如果您在组件内部创建一个，并且它附加到全局可用元素，那么您需要调用disconnect()以清理它们。
// （请注意，被垃圾回收的 DOM 节点也会让它们的侦听器和观察者被垃圾回收。所以通常，您只需要担心全局元素，例如 the <body>、 the document、无处不在的页眉/页脚元素等）
// 4、Promises，Observables，EventEmitters等。如果您忘记停止侦听，任何设置侦听器的编程模型都可能泄漏内存。（如果 Promise 从未被解析或拒绝，它可能会泄漏，在这种情况下，.then()附加到它的任何回调都会泄漏。）
// 5、全局对象存储。对于像Redux这样的东西，状态是全局的，所以如果你不小心，你可以继续向它附加内存，它永远不会被清理。
// 6、无限的 DOM 增长。如果你在没有虚拟化的情况下实现无限滚动列表，那么 DOM 节点的数量将无限增长。

// 三、如何检测
// 选择阅读参考文章就可以了里面有一段话
// 如何去使用工具去经行检测非常简单，但要找到内存泄漏源，是非常耗时和困难的
// 如何去查找泄漏非常考验经验

// 总结
// 使用开发者工具去寻找内存泄漏，1、通常要将问题给细化，比如现怀疑打开一个对话框存在内存泄漏的情况这里就需要
// 打开对话框 回退到上一次页面 重复，记录好内存快照后进行比对
// 2、不同场景下要反复去经行内存快照经行对比
// 3、针对噪声还需要多测几次 比如七次 可以观察对象创建，占用情况等的数字是否是 7 或者是 7的倍数

// 这里我发现了一个监听内存泄漏的工具 可以看这个文章 https://nolanlawson.com/2021/12/17/introducing-fuite-a-tool-for-finding-memory-leaks-in-web-apps/
// github: https://github.com/nolanlawson/fuite  start:3K 感觉还是听不错的
