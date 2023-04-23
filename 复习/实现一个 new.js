// new 

// 1. 创建一个对象 
// 2. 对象的 prototype 指向 该函数
// 3. this 为这个对象
// 4. 执行这个对象
// 5. 返回

function my_new(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)

  return (result && typeof result === 'object') ? result : obj  
}