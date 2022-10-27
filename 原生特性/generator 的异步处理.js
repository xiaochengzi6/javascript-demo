// 参考文章： https://es6.ruanyifeng.com/#docs/generator-async
function add(x, y) {
  return x + y
}

function thunk(x) {
  return function (y) {
    return add(x, y)
  }
}

// Thunk 函数替换的不是表达式，而是多参数函数，
// 将其替换成一个只接受回调函数作为参数的单参数函数。



// thunk 函数转换器

// es5 
function thunk_es5(fn) {
  return function () {
    var args = [].slice.call(arguments)
    return function (callback) {
      args.push(callback)
      return fn.apply(this, args)
    }
  }
}

// es6 
const thunk_es6 = (fn) => (...args) => (callback) => fn.call(fn, ...args, callback)


// thunkify 源码

function thunkify(fn) {
  return function () {
    var args = new Array(arguments.length)
    var ctx = this

    // 保存第一次的参数
    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i]
    }
    // 接收第二次的参数
    return function (done) {
      var called

      // 组装参数
      args.push(function () {
        if (called) return
        called = true // 避免 done 执行多次
        done.apply(null, arguments)
      })

      // 执行
      try {
        fn.apply(ctx, args)
      } catch (error) {
        done(err)
      }
    }
  }
}

// test 

function f(a, b, callback) {
  var sum = a + b
  callback(sum)
  callback(sum)
}

var ft = thunkify(f)
var print = console.log.bind(console)
ft(1, 2)(print)

// 结合 generator 来看 使其能够自动执行
function func(x, callback) {
  // 做一些异步的任务
  setTimeout(() => {
    callback(x)
  }, 3000)
}
var gen = thunkify(func)

function* g() {
  yield gen(1)
  yield gen(2)
  yield gen(3)
}

// 执行器使其能够自动调用
function run(fn) {
  var gen = fn()

  // next 其实可以理解成 thunk 的回调函数 接收 data 就是要异步获取到的结果 
  function next(data) {
    // 这里可以对 data 数据做一些处理 
    console.log(data)
    var result = gen.next(data)
    if (result.done) return
    // result 执行上一次 yield 返回的对象 {value: xxx, done: false}
    // value 是 yield 表达式的值 一般是函数(thunk 返回的就是函数)
    result.value(next)
    // 但这里就会传入 next 函数 且还会执行 gen.next(data) 使其能够一直调用
  }

  next()
}

run(g)

// generator 函数自动执行必须要不断的取回对自身的控制权限从而能够自动执行
// 1.回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。
// 2.Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

// 将 回调函数 和 promise 结合在一起
function run(fn) {
  var gen = fn()

  function next(data) {
    var result = gen.next(data)
    if (result.done) return
    if (isPromise(result.value)) {
      result.value.then((data) => {
        next(data)
      })
    } else {
      result.value(next)
    }
  }

  next()
}
function isPromise(obj) {
  return 'function' === typeof obj.then
}


// 上述是回调函数版本 尝试 promise 版本

function run(gen) {
  var gen = gen()

  return new Promise(function (resolve, reject) {

    function next(data) {
      try {
        var result = gen.next(data)
      } catch (e) {
        return reject(e)
      }

      if (result.done) {
        return resolve(result.value)
      }

      var value = toPromise(result.value)

      value.then(function (data) {
        next(data)
      }, function (e) {
        reject(e)
      })
    }

    next()
  })
}


// 优化 
function run(gen) {

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen()
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()

    function onFulfilled(res) {
      var ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function onRejected(err) {
      var ret
      try {
        ret = gen.throw(err) // 将错误类型放入gen中看看是否 generator 函数内部是否捕获这个错误
      } catch (e) {
        return reject(e)
      }
      next(ret) // 没有产生错误说明 generator 内部捕获了错误，可以继续向下执行
    }

    function next(ret) {
      if (ret.done) return
      var value = toPromise(ret.value)
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
      return onRejected(new TypeError('yield 返回的表达式并不是 promise 类型'))
    }
  })

}



// ---------------------- 工具函数 --------------------------
function toPromise(obj) {
  if (isPromise(obj)) return obj
  if ('function' === typeof obj) return thunkToPromise(obj)
  return obj
}

function thunkToPromise(fn) {
  return new Promise(function (resolve, reject) {
    fn(function (err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}