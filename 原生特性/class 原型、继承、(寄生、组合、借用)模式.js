
// 一、继承
// es5 继承方式，先创建一个对象，调用父类的属性和方法给实例的对象添加属性和方法，最后将对象设置为子类的实例
// est5: 先实例后继承

// es6 继承方式，先将对象属性和方法放入空对象上，然后将空对象设置为子类的实例
// es6: 先继承后实例 


//  class 的继承形式
class Father {
  constructor() {
    this.father = 'father'
  }
}

class Child extends Father {
  constructor() {
    // 必须调用 supper() 不然不能使用 this 
    super()
    this.child = 'child'
  }
}

// 必须再子类的 consturctor 函数中调用一次 supper() 函数，不然访问不到 this, 实际上就是再执行 子类的时候先调用了一下 父类
// 父类先完成一次继承后子类才能去修改

// 这其实可以看成是两个 构造函数 的继承，ConstructorA 和 ConstructorB 的继承
// 前者作为超类，后者作为子类，确定继承关系后就准备下一步
function ConstructorA() {
  this.father = 'father'
}

function ConstructorB() {
  this.child = 'child'
}

// 通过 apply/call 的方式以超类优先的顺序依次调用 ConstructorA 和 ConstructorB 构造函数
// 最后在通过 Object.create() or Object.setPrototype() 设置 子类的 原型 === 超类的原型
function Constructor() {

  ConstructorA.call(this)
  ConstructorB.call(this)

  Object.setPrototypeOf(ConstructorB, ConstructorA)
  Object.setPrototypeOf(ConstructorB.prototype, ConstructorA.prototype)

  return obj
}

// 这样的方式很像 class Child extends Father {} 

// 2. supper  关键字

// 调用 supper() 的作用是为了将 父类的属性和方法挂载道 子类的 this 对象上的，如果没有调用就会抛错
// 虽然调用的是 父类的 constructor 构造函数 但是返回的是 子类的 this 对象

// 所以 supper() ===> A.prototype.constructor.call(this) 【this: 子类的 this】

// supper 关键词有两种用法
// 1. 作为函数调用
// 2. 作为 对象：作为对象使用的时候 supper.father 
//    在普通方法中 supper 指向父类的原型对象

//    在静态方法中 supper 指向父类
//    在静态方法中调用 supper.x this 指向的 子类

// 二、原型
// 1. class 有两条原型链 
// 原因： class 是构造函数的语法糖同时存在 __proto__ 和 prototype 两种属性，因此有两条继承链
class B extends A {

}
// B.__proto__ === A 
// B.protype.__proto__ === A.prototype 

// 1. 子类的 __proto__ 总是指向父类
// 2. 子类的 prototype 属性的 __proto__ 总是执行 父类 的 prototype

// 暂无继承的 
class A {

}

// A.prototype === Function.prototype 
// A.prototype._proto__ == Obeject.prototype 

// 2. 实例的 __proto__ 属性
// 还是上面的例子
const a = new A()
const b = new B()

// b.__proto__.__proto__ === a.__proto__

// 这是因为 b.__proto__ === B.prototype 
// B.prototype.__proto__ === A.prototype 
// a.__proto__ === A.prototype 

// 所以 子类的原型的原型就是 父类的原型

// 三、寄生、组合、借用以及寄生组合式继承等名词

// 它们无非是在试图组合两个 constructor 及其 prototype，
// 协调它们在属性初始化和原型继承上的关系。
// 因为 constructor 模式，耦合了多个过程在内，导致开发者需要通过一些技巧，去屏蔽自己不想要的行为。
// 引用了- https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg

// 1. 原型链继承
// 优点： 父类方法可以复用
// 缺点： 1. 更改子类引用属性父类也会被修改 2. 在创建实例时不能向父类构造函数传递参数
function A(msg) {
  this.msg = msg 
  this.a = 1
}

A.prototype.log = msg => console.log(msg)

function B() {}

B.prototype = new A()

var child = new B() 

// 2. 盗用构造器（构造函数继承）
// 优点： 1. 解决实例之间相互修改的问题  2. 解决传参
// 缺点： 1. 子类不能访问父类上定义的方法 2. 所有方法都要写到构造函数中，每次创建实例都会初始化
function A(msg) {
  this.msg = msg 
  this.a = 1
}

A.prototype.log = msg => console.log(msg)

function B(msg) {
  A.call(this, msg)
}

var child = new B('xx') 

// 3. 组合继承
// 优点： 集合了 原型链继承和盗用构造器继承
// 缺点： 需要两次 new 父类构造函数

function A(msg) {
  this.msg = msg 
  this.a = 1
}

A.prototype.log = msg => console.log(msg)

function B(msg) {
  A.call(this, msg)
}

B.prototype = new A()
var child = new B('xx') 

// 4. 原型式继承
// 类似于 Object.create() 
// 优点： 父类方法可复用
// 缺点： 父类方法会被所有子类共享， 2.不能接受参数
function create(proto) {
  const result = Object.create(proto)

  return result 
}

// 5. 寄生继承
// 寄生继承式在 原型式的基础上 给实例添加了方法或者属性
// 优点： 增强了浅拷贝的能力
function create(obj) {
  const result = function () {}

  result.prototype = obj 

  result.a = 'result'
  result.log = () => console.log('xxx')

  return new result() 
} 

// 6. 寄生组合继承 
// 最佳模式
//  优点： 1.只调用一次 父类构造函数
//  2. 可以向父类构造函数传参
//  3. 父类方法可复用
//  4. 引用类型不会被共享

function objectCopy(obj){
  function Func() {}
  Func.prototype = obj 

  return new Func() 
}

function inheritPrototype(child, parent) {
  const prototype = objectCopy(parent.prototype)
  prototype.constructor = child 

  child.prototype = prototype 
}

function Parent (name) {
  this.name = name 
} 

function Child (name, age) {
  Parent.call(this, name)

  this.age = age 
}

inheritPrototype(Child, Parent)

const child = new Child('perty', 23)


// 四、题目

// 将多个类混入一个类
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        // 拷贝实例属性
        copyProperties(this, new mixin())
      }
    }
  }

  for (let mixin of mixins) {
    // 拷贝静态属性
    copyProperties(Mix, mixin)
    // 拷贝原型方法
    copyProperties(Mix.prototype, mixin.prototype)
  }

  return Mix
}

function copyProperties(target, source) {
  for(let key of Reflect.ownKeys(source)){
    if(key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name' 
    ){
      let desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}