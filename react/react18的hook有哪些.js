// 参考：https://juejin.cn/post/7118937685653192735#heading-22

/**
 * 数据驱动
 * 
 * useTransition 
 *   在 React v18 中，有一种新概念叫做过渡任务，这种任务是对比立即更新任务而产生的
 *   立即更新任务：用户的点击，摁键、输入
 *   所谓的过渡也可以理解为是延后，将优先级调低(调节 setState 更新的优先级)
 *   const [isPending, starTranstion] = useTransition()
 * 
 * isPending:过渡状态标志
 * startTranstion: 方法
 * 
 * 
 * 
 * useDeferredValue 
 *   React 18 提供了 useDeferredValue 可以让状态滞后派生。
 *   useDeferredValue 的实现效果也类似于 transtion，当迫切的任务执行后，再得到新的状态，而这个新的状态就称之为 DeferredValue。
 *   
 *   可以看 https://zh-hans.react.dev/reference/react/useDeferredValue
 *   它这里说再初开始的时候使用你默认值，再更新的时候先提供旧的值给你，然后再尝试提供新的值
 *   也就是说使用它会较晚获取到新状态
 *  
 *   const deferredValue = useDeferredValue(value)
 * 
 * 相同点： useDeferredValue 本质上和内部实现与 useTransition 一样都是标记成了过渡更新任务。
 * 
 * 不同点： useTransition 是把 startTransition 内部的更新任务变成了过渡任务transtion,
 *         而 useDeferredValue 是把原值通过过渡任务得到新的值，这个值作为延时状态。 一个是处理一段逻辑，另一个是生产一个新的状态。
 * 
 * 副作用
 * useInsertionEffect() 
 *   类似于 useEffect 方法
 *   但执行顺序会被 uselayoutEffect 还要提前
 *   useInsertionEffect 的执行的时候，DOM 还没有更新
 *   本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题。
 * 
 * 工具 hook 
 * 
 * useDebugValue(value, format)
 *   value: 用于再开发者工具中显示 比如 你自定义了一个 hook (useUpdate)使用了 useDebugValue(value) 那就会显现：
 *          useUpdate: value 
 *   format: 格式化函数，接受你传入的 value 去格式化输出
 * 
 * 
 * useId()
 *  生成服务端和客户端相同的 ID 
 *  确保 id 的稳定性
 * 
 * const rid = useId()
 */