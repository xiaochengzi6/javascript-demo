/**
 * react 存在两种组件
 * 1. 函数组件
 * 
 * 2. 类组件
 * 
 * 不同的组件的优化点是不一样的
 * 
 * 一、函数组建的优化方法
 * 
 * 从react 16 开始就有了函数组件，为了解决函数组件是无状态组件就引入了 hook 官方提供了较多的 hook 可以去使用
 * 提供优化的 hook 有 useCallback useMemo useRef 
 * 推荐使用 ahook 库去结合 react 项目使用
 * 1. 解决了闭包问题
 * 2. 提供了不同时机下的 hook 如 
 * 3. 提供了一些常见的操作 dom 的 hook 
 * 
 * 首先看一个场景 父子组件
 * 
 * 1. 子组件未接收父组件的任何参数，但父组件更新就会带动子组件一块更新  解决方式使用 react.memo 包裹子组件
 * 2. 子组件被 react.memo 包裹且 接收参数 ，父组件更新时子组件也会更新，
 *    这个原因是因为每次组件更新都是一次重新创建变量与运行所以，子组件接收的参数如果是引用类型虽然值相同但是引用地址不一样
 *    就会造成子组件更新，
 *    解决方式：使用 useMemo() 去包裹传入子组件的参数 如果传入的是 函数 考虑使用 useCallback()
 * 
 * 3. 组件中有可能会创建一些函数，或者是一些计算量较高的属性针对这些问题可以使用 useCallback() or useMemo() 去包裹 
 *    不过造成的后果就是不太美观，影响观感，如果是次数较小的更新可以考虑不包裹
 * 
 * 
 * 
 * 二、类组件的优化方向
 * 
 * 类组件通常是这样去写的 `class App extends React.Component {}` 
 * 然后使用 shouldCompoentUpdate(nextProps, nextState){  }
 *   返回值为 false 就不会更新
 *   返回值为 true 执行到下一步
 * 
 * shouldComponentUpdate 的执行时间实在 render 之前
 * 
 * 当然还可以使用 `class App extends React.PureComponet {}` 
 * PureComponet 主要是接收 nextProps 和 nextState 然后进行浅比较相当于是内置写的了 scu 
 * 
 * 
 * 三、react.memo、scu && PureComponent 的重点介绍 
 * 
 * React.memo(component, fn) => MemoizedComponent 
 * component: 组件
 * fn: (props, newProps) => Boolean 默认情况下使用 Object.is() 比较每一个 props
 * 
 * 
 * shoudleComponentUpdate(newProps, newState, nextContext) => Boolean 
 *  return true 会进行更新的下一步 false 代表停止更新
 *  并不建议使用 JSON.stringify() 和 深比较 
 * 1. 返回 false 并不会阻止其状态改变时重新执行
 * 2. 返回 false 并不能阻止组件不会重新重现，仍然可以选择重现重现组件
 * 
 * 
 * pureComponent 通过 prop 和 state 的浅比较（shallowEqual）来实现
 * 
 * 它代替了shouldComponentUpdate的工作, 只比较外层数据结构，只要外层相同，则认为没有变化，不会深层次比较数据。
 * 
 * 优点：不需要开发者使用shouldComponentUpdate就可使用简单的判断来提升性能；
 * 
 * 缺点： 由于进行的是浅比较，可能由于深层的数据不一致导致而产生错误的否定判断，从而导致页面得不到更新；
 * 
 * 特殊点：
 *   1. 当值为传入子组件参数为基本类型时，值改变子组件会更新
 *   2. 当值为引用类型如 array 或者 object 当往其添加元素的时候子组件并不会更新
 *   3. 比如 this.state = {arr: [1]} 调用 this.setState({arr: [...arr, 2]}) 无论继承 Component 还是 PureComponent 都会导致组件更新
 *   4. PureComponent不仅会影响本身，而且会影响子组件
 *   5. 如果state和prop一直变化的话，还是建议使用Component，并且PureComponent的最好作为展示组件 
 * 
 * 参考：PureComponent https://juejin.cn/post/6844903649643069454
 */