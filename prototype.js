// inherit 函数
// class 继承函数
const inherit = (SuperConstructor, properties) => {
  let { constructor } = properties

  let SubConstructor = function (...args){
    SubConstructor.call(this, ...args)
    constructor.call(this, ...args)
  }

  SubConstructor.prototype = {
    ...properties,
    constructor: SubConstructor
  }

  Object.setPrototypeOf(
    SubConstructor.prototype,
    SuperConstructor.prototype
  )
  return SubConstructor
}

const Human = inherit(Object, {
  constructor({age}){  
    this.age = age
  },
  showAge(){
    console.log("age", this.age)
  }
})

console.log(Human)


// 使用 prototype 模拟链式调用
Object.defineProperty(Object.prototype, 'next', {
  get(){
    let next = Object.getPrototypeOf(this)
    if(next === Object.prototype) return null
    return next
  },
  set(value){
    return Object.setPrototypeOf(this, value)
  }
})

// 循环需要注意的有两点： 1、判出条件 2、循环要素

// 模拟原型链上的查找
function serath (SubObject, attribute){
  let current = SubObject
  if(current == null){
    throw new Error("current not Object")
  }
  while(current){
    if(Object.prototype.hasOwnProperty.call(current, attribute)){
      return current[attribute]
    }

    current = Object.getPrototypeOf(current)
  }
}


