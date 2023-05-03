// react 17 和 react 18 的对比

/**
 * 1. 并发模式
 * 
 * react 18 中在管理根节点时 使用
 *   React.createRoot(root) 
 *   使用的好处就是可以开启并发模式，在并发模式下异步代码中的 setState 会批量更新
 *   在 17 中，异步代码中并不会批量
 * 
 *   不过还是可以使用 ReactDOM.render(root, callback) 去创建根节点，兼容 17 
 * 
 * 2. render(root) 中没有回调函数
 *   在 使用 react 18 版本的 'react/client' 这个包的 reactDOM.render 方法没有回调函数
 * 
 * 3. props 没有 childs 属性
 *   在 React 17 的 FC 中，默认携带了 children 属性
 *   在 React 18 的 FC 中，不存在 children 属性，需要手动申明
 * 
 * e.g
 * interface MyTopProps {
 *   children?: React.ReactNode
 * }
 * 
 * const Top:React.FC<MyTopProps> ({children}) => <div> {children} </div>
 * 
 * 
 * 4. 使用 `flucshSync`退出批量更新
 *    flushSync 函数内部的多个 setState 仍然为批量更新
 *  
 * 
 * 5. 组件返回值
 *   在 React 17 中，如果你需要返回一个空组件，React只允许返回null。
 *      如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。
 *   在 React 18 中，不再检查因返回 undefined 而导致崩溃。既能返回 null，也能返回 undefined
 *    （但是 React 18 的dts文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。
 * 
 * 6. Strict Mode
 *    <React.StrictMode> </React.StrictMode>
 *    当你使用严格模式时，React 会对每个组件进行两次渲染，以便你观察一些意想不到的结果。
 *       在 React 17 中，取消了其中一次渲染的控制台日志，以便让日志更容易阅读。
 * 
 *    为了解决社区对这个问题的困惑，在 React 18 中，官方取消了这个限制。
 *      如果你安装了React DevTools，第二次渲染的日志信息将显示为灰色，以柔和的方式显式在控制台。
 * 
 * 7. Suspense 不再需要 fallback 来捕获
 *    如果你的 Suspense 组件没有提供 fallback 属性，React 就会悄悄跳过它，继续向上搜索下一个边界
 * 
 *    现在，React将使用当前组件的 Suspense 作为边界，即使当前组件的 Suspense 的值为 null 或 undefined：
 * 
 * 
 * 8. 并发模式
 *      react 可以同时更新多个状态
 *      React 17 和 React 18 的区别就是：从同步不可中断更新变成了异步可中断更新。
 *      使用 createRoot(root).render(<App />) 就可以开启并发模式了。
 * 
 *      在 18 中，不再有多种模式，而是以是否使用并发特性作为是否开启并发更新的依据。
 * 
 *     并发更新的意义就是交替执行不同的任务，当预留的时间不够用时，
 *         React 将线程控制权交还给浏览器，等待下一帧时间到来，然后继续被中断的工作
 * 
 * 
 * 9. 新的 API 
 *     useTransition
 *     useDeferredValue 
 *     useInsertionEffect 
 *     useId
 *     useDebugValue 
 * 
 * 10. 并发特性
 *     useTransition
 *     useDeferredValue 
 * 
 * 
 * 
 * 参考：https://juejin.cn/post/7094037148088664078
 */

