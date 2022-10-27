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
function thunk_es5 (fn) {
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

function f(a, b, callback){
  var sum = a + b 
  callback(sum)
  callback(sum)
}

var ft = thunkify(f)
var print = console.log.bind(console)
ft(1,2)(print)

// 结合 generator 来看 使其能够自动执行
function func(x, callback){
  // 做一些异步的任务
  setTimeout(()=>{
    callback(x)
  }, 3000)
}
var gen = thunkify(func)

function* g(){
  yield gen(1)
  yield gen(2)
  yield gen(3)
}

// 执行器使其能够自动调用
function run (fn) {
  var gen = fn() 

  // next 其实可以理解成 thunk 的回调函数 接收 data 就是要异步获取到的结果 
  function next(data){
    // 这里可以对 data 数据做一些处理 
    console.log(data)
    var result = gen.next(data)
    if(result.done) return 
    // result 执行上一次 yield 返回的对象 {value: xxx, done: false}
    // value 是 yield 表达式的值 一般是函数(thunk 返回的就是函数)
    result.value(next)
    // 但这里就会传入 next 函数 且还会执行 gen.next(data) 使其能够一直调用
  }

  next()
}

run(g)


// 上述是回调函数版本 尝试 promise 版本

function co(fn){
  var ctx = this 
  return new Promise((resolve, reject) => {
    if(typeof gen === 'function') gen = gen.call(ctx)
    if(!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()
    function onFulfilled(res){
      var ret 
      try{
        ret = gen.next(res)
      }catch(err){
        reject(err)
      }
      next(ret)
    }
    
  })
}