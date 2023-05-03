// 参考：https://juejin.cn/post/7171231346361106440#comment
// 一、rende + commit 阶段 

// react 是通过 jsx 语法来写的，会使用 babel 对 jsx 语法进行转换成 render Function (react.createElement)
// 然后形成 vdom (vdom 其实就是用 js 来表示 dom 树)

// 又因为 vdom 在遍历时不可中断(只有指向向下的元素) 所以会转成 Fiber 对象
// fiber 可以通过 child sibling return 关联 父节点 、子节点、兄弟节点 
// vdom 转 fiber 的这个过程叫 reconcile 这个过程还会创建用到的 dom 节点，并且打上增删改的标记。
// 这个 reconcile 的过程叫做 render 阶段

// 下一个阶段时 commit 阶段
// commit 阶段会根据标记来增删改 dom
// commit 阶段也分为了 3 个小阶段，before mutation、mutation、layout

// mutation 阶段会增删改 dom，before mutation 是在 dom 操作之前，layout 是在 dom 操作之后。

// useEffect 和 useLayoutEffect 的回调也都是在 layout 阶段执行的
// 只不过 useLayoutEffect 的回调是同步执行，而 useEffect 的回调是异步执行。

// 当你 setState 之后，就会触发一次渲染的流程，也就是上面的 render + commit。



// 二、同步模式
// 每次 setState 就会触发一个  render + commit, 多个 setState 就会有多个 render + commit

// 但这个就会存在问题，比如用户在 input 输入内容的时候，会通过 setState 设置到状态里，会触发重新渲染。
// 这时候如果还有一个列表也会根据 input 输入的值来处理显示的数据，也会 setState 修改自己的状态。
// 这两个 setState 会一起发生，那么同步模式下也就会按照顺序依次执行。
// 但如果这个渲染流程中处理的 fiber 节点比较多，渲染一次就比较慢，这时候用户输入的内容可能就不能及时的渲染出来，用户就会感觉卡，体验不好。


// react 将 vdom 转换成  fiber 线性结构也就是说通过 while 就能处理完

// 那么这个模式就被称为 workLoop 

// 并发就是再同一时间执行多个任务

// 当再 workLoop 模式下 每处理 一个fiber 节点都会判断一下是否需要打断 也就是通过 shouldYield() 函数，当 shouldYield 返回 true 就会终止循环

// 如何进行恢复呢？
/**
 * setState 引起的渲染就是由 Scheduler 管理的，它维护了一个任务队列，上一个任务执行完，就会执行下一个任务，
 * 没渲染完就添加一个新任务进行
 * 
 * 
 * 判断是否渲染完是要看 fiber 节点是否都渲染完，全部渲染完 那 workInProgress 的指针指向 null 
 * 如果没有渲染完 那 workInProgress 就不会是 null 
 * 
 * 那就根据 workProgress 来判断是否被中断
 * 
 * 如果中断了就会将剩下的节点再 schedule 到这个任务中，就会继续渲染
 */

// shouldYield 函数是如何打断点的呢？
/**
 * 根据过期时间，每次开始处理时记录个时间，如果处理完这个 fiber 节点，时间超了，那就打断
 * 
 * 过期时间 5ms
 */

// 也就是说 react 的并发模式会根据时间进行打断 这也就是时间切片


// 三、优先级

// 优先级只会影响任务队列的任务排序

// 一共有五种优先级

/**
 * 1. 离散事件
 * 
 * 2. 连续事件
 * 
 * 3. 默认优先级
 * 
 * 4. 低优先级
 * 
 * 5. 空闲优先级
 */

// 并发模式下的 setState 优先级不同，是通过 scheduler 的优先级实现的 

/**
 * react 优先级机制有 31 种，通过二进制去保存不同的优先级 被称为 Lane 
 * 
 * 事件优先级有四个
 * 1. 离散事件优先级
 * 2. 连续事件优先级
 * 3. 默认优先级
 * 4. 空闲优先级
 * 
 * 先将 31 种 lane 换成 事件优先级，然后再转换成 Scheduler 五种优先级
 * 
 * 然后根据优先级去对任务排序
 */


// 总结 ： 所谓的并发执行就是添加了一个  5ms 的时间分片
// 并不是所有的都要进行时间分片，

