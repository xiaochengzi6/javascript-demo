// react 组件生命周期
// 1. class 组件
// 2. function 组件 

// 1. class 组件中 
// 组件初始化
// 组件更新
// 组件销毁


// 1. 组件初始化
// componentDidMount 
// 做一些初始化的东西

// 2. 组件更新
// componentUpdate 


// 3. 组件销毁
// componentwillUnmount 




/**
 * 一、组件初始化
 * 1. constructor 
 * 
 * 2. getDerivedStateFromProps 
 *       可以去替代 componewillmount, 组件初始化或更新的时候将 props 映射到 state 上
 * 
 * 3. componentWillMount 
 *    初始化工作
 * 
 * 4. render 
 *       更新 dom
 * 
 * 5. componentDidMount
 *    做一些关于 DOM 的操作，如基于 DOM 的事件监听器
 *    初始化发起异步请求数据，渲染视图      
 */

function useMount(callback: () => void) {
  useEffect(() => {
    callback?.()
  }, [])
}


/**
 * 二、组件更新
 * 1. componentWillReceiveProps
 *      监听父组件是否执行 render
 *      在异步回调改变 state
 *
 * 2. getDerviedStateFromProps
 *
 * 3. shouldComponentUpdate
 *      return false 退出
 *      return true  进行下一步骤
 *
 * 4. render
 *
 * 5. getSnashotDeforeUpdate
 *      主要配合 componentDidUpdate 使用
 *      参考：https://zh-hans.react.dev/reference/react/Component#getsnapshotbeforeupdate
 *
 * 6. 更新 dom
 *
 * 7. componentDidUpdate
 *      获取组件更新后的 dom 元素
 *      消费 getSnashotDeforeUpdate 获取的值
 */

const useUpdateEffect = (fn: () => void, deps) => {
  const isMounted = useRef(false)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true
    } else {
      fn?.()
    }
  }, deps)
}

/**
 * 三、组件销毁
 *
 * 1. componentwillUnMount
 *
 * 做一些收尾工作，清楚一些定时器、移除dom元素事件监听器
 */

const useUnmount = (fn: () => void) => {
  useEffect(() => () => {
    fn?.()
  })
}

// 函数组件

// uselayoutEffect
// useEffect


// 额外的

/**
 * 什么是纯函数？
 * 1. 相同的输入返回相同的输出
 * 2. 不会修改函数的输入值
 * 3. 不依赖外部环境状态
 * 4. 无任何副作用
 */

/**
 * 什么是副作用？
 * 1. 引用了外部变量
 * 2. 修改外部函数
 * 3. 计时器
 * 4. 修改 dom 
 * 5. 修改了全局的变量
 * 6. 网络请求
 * 7. 存储相关的
 */

