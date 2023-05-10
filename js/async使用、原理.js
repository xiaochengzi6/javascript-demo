// async 其实可以看做是 generate 函数，当使用 await 的时候就相当于调用了 promise.then 方法

// async 就是将 generate 函数和自动执行器包装成了一个

// 1. return 返回的值将会作为回调函数的参数

async function foo () {
  return 1 
}

foo().then((value) => {
  console.log(value)
})

// 2. async 函数体内抛错也会被 外层 then 或者 catch 方法接收
async function foo () {
  throw TypeError('')
}

foo.then(v => console.log(v), e => console.log(e))

// 3. 任何一个 await 后面的 promise 对象状态为 reject 时 整个 async 函数都会中断
//    catch() 都会接收到据因

async function foo() {
  await TypeError('')
}

const build = foo().catch(e => console.log(e))

// 4. 可以使用 try{} catch() {} 去捕获错误

async function foo() {
  try{
    const value1 = await fi()
    const value2 = await build()
  }catch(e) {
    conosle.log(e)
  }
}

// 5. async 的写法时串行的，并不存在并行 可以尝试下面写法

// 写法1： let [foo, bar] = Promise.all([getFoo(), getBar()])
// 写法2： 

/**
 * let foo = getFoo()
 * let bar = getBar() 
 * 
 * // 同时触发
 * let resultFoo = await foo
 * let resultBar = await bar 
 */


// 二、原理

async function foo (args){

}

function foo (args) {
   return spawn(function *() {
     //...
   })
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF()
    
    function step(nextF) {
      let next 
      try {
        next = nextF()
      }catch(e) {
        return reject(e)
      }

      if(next.done) {
        return resolve(next.value)
      }

      Promise.resolve(next.value).then(function(v) {
        step(function() {return gen.next(v)})
      }, function(e) {
        step(function() {return gen.throw(e)})
      })
    }

    step(function() {return gen.next(undefined)})
  })
}