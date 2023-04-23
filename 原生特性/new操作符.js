// 博客文章：https://github.com/xiaochengzi6/Blog/issues/3

// new 操作符的实现

// 1 创建一个对象
// 2 对象的原型指向目标原型
// 3 构造函数内部的 this 复制给这个新对象
// 4 执行构造函数代码（给新对象添加属性）
// 5 返回一个对象

// 特别的: 如果返回的不是对象就返回创建的对象，否则返回该对象

function myNew(target) {
  if (!target || !typeof target === 'function') {
    return TypeError('构造函数不存在')
  }
  const args = [...arguments].slice(1)
  const obj = Object.create(target.prototype)
  const newObj = target.apply(obj, args)
  return typeof newObj === 'object' && newObj !== null ? newObj : obj
}

// 改进版本
function my_new(target, ...args) {
  if (typeof target !== 'function') {
    return new TypeError('target is not function type')
  }

  const obj = Object.create(target.prototype)
  const newObj = target.apply(obj, args)
  return typeof newObj === 'object' && newObj !== null ? newObj : obj 
}

// test
const obj = {
  name: 'my_new'
}

function func(name) {
  this.name = name
}

