/**
 * 生成 store 函数
 * @param {*} state 默认初始值
 * @param {*} stateChange 相当于 Reducer
 * @returns
 */
function createStore(state, stateChange) {
  const listeners = []

  const subscribe = (listener) => listeners.push(listener)

  const getState = () => state

  const dispatch = (action) => {
    stateChange(state, action)
    listeners.forEach((listender) => listender())
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}

/**
 * 主要功能是返回一个 运行 reducer 的函数 其中会返回新的 state
 * @param {*} reducerMap reducer 数组
 * @returns reducer
 */
function combineReducers(reducerMap) {
  const reducerKeys = Object.keys(reducerMap)

  // 返回 reducer 函数
  const reducer = (state = {}, action) => {
    const newState = {}

    // 主要就是运行所有的 reducer
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const currentReducer = reducerMap[key]
      const preState = state[key]

      newState[key] = currentReducer(preState, action)
    }

    // 返回新的 state
    return newState
  }

  return reducer
}

/**
 * 处理中间件的函数
 * @param  {...any} middlewares 接收多个中间件
 * @returns 返回 {store, dispatch}
 */
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    // 传递给中间件的参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }

    // 中间件接收 一个 { getState , dispatch } 的对象
    chain = middlewares.map((middleware) => middleware(middlewareAPI))

    // 这里使用 compose 包装 store.dispatch
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)

  // [a, b, c, d, e] ==> a(b(c(d(e()))))
  // last(...args) 的返回值 composed 会被 f 包裹起来 然后等于 composed 再被下一个元素包裹起来 一直这样直到结束
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

// 构建一个中间件
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }

// 为什么要接收一个 next ?
// 因为再 applyMiddleware 中 compose(...chain)(store.dispatch) 做了这样的操作 而 dispatch 也可以被看作是 next
