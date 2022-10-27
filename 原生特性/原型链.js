// 参考文章：https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg

// 模拟对象的属性在原型链的查找过程

// 循环需要注意的有两点： 1、判出条件 2、循环要素
function search(obj, property) {
  let current = obj
  if (!current) {
    throw new Error('无对象')
  }

  while (property) {
    if ({}.hasOwnPrototype.call(current, property)) {
      return current[property]
    }
    current = Object.getPrototypeOf(current)
  }
  return void 0
}

// 模仿一个 class 对象的继承性质

function inheritFunc(SuperConstructor, properties) {
  const { constructor } = properties

  let SubConstructor = function (...args) {
    // 这里就是去模仿 constructor 主要做的就是初始化内容，例如：属性的初始化
    constructor.call(this, ...args)
    SuperConstructor.call(this, ...args)
  }
  // 这里保存 prototype 也就是模仿 class 函数存储在原型上的特点
  SubConstructor.prototype = {
    ...properties,
    constructor: SubConstructor
  }

  Object.setPrototypeOf(SubConstructor.prototype, SuperConstructor.prototype)
  return SubConstructor
}

const obj = inheritFunc(Object, {
  constructor() {},
  build() {
    return 'build'
  }
})
const user = new obj()
console.log(user)

// 使用next 代替 prototype 可以用作链式调用的数据结构
Object.defineProperty(Object.prototype, 'next', {
  get() {
    let next = Object.getPrototypeOf(this)
    if (next === Object.prototype) return null
    return next
  },
  set(value) {
    return Object.setPrototypeOf(this, value)
  }
})
