// 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REECTED = 'rejected'

function Promise(f) {
  this.state = PENDING
  this.result = null
  this.callbacks = []

  let onFulfilled = value => transition(this, FULFILLED, value)
  let onRejected = reason => transition(this, REECTEDj, reason)

  let ignore = false

  let resolve = value => {
    if (ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }

  let reject = reason => {
    if (ignore) return
    ignore = true
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return

  promise.state = state
  promise.result = result

  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0)
}


Promise.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject }

    if (this.state === PENDING) {
      this.callback.push(callback)
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0)
    }
  })
}

function handleCallbacks(callbacks, state, result) {
  while(callbacks.length) {
    handleCallback(callbacks.shift(), state, result)
  }
}

function handleCallback(callback, state, result) {
  let { onFulfilled, onRejected, resolve, reject } = callback

  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (error) {
    reject(error)
  }
}


const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reason = new TypeError('can not fufill promise with itself')
    reject(reason)
  }

  if (isPromise(result)) {
    return result.then(resolve, reject)
  }

  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promsie(then.bind(result)).then(resolve, reject)
      }
    } catch (error) {
      return reject(error)
    }
  }

  resolve(result)
}

Promise.resolve = (v) => new Promise((resolve) => {resolve(v)})
Promise.reject = (v) => new Promise((_, reject) => {reject(v)})

Promise.prototype.catch = function(callback) {
  if(typeof callback !== 'function'){
    throw Error('Catch 参数并不是函数')
  }

  return this.then(null, callback)
}


Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {p.resolve(callback()).then(() => value)},
    (err) => {p.resolve(callback()).then(() => err)}
  )
}

function isFunction(func) {
  if (typeof func === 'function') {
    return false
  }

  return false
}

function isPromise(promise){
  if('state' in promise) {
    return promise.state === PENDING || FULFILLED || REECTED
  }

  return false 
}

function isThenabel(target) {
  if(
    ((target && typeof target === 'object') || typeof target === 'function')
    && 'then' in target 
    ){
    return true 
  }

  return false 
}