// 模拟对象的属性在原型链的查找过程
function search(obj, property){
  let current = obj;
  if(current){
    throw new Error('无对象')
  }

  while(property){
    if(({}).hasOwnPrototype.call(current, property)){
      return current[property];
    }
    current = Object.getPrototypeOf(current)
  }
  return void 0
}
// 问题
// Child.prototype = Object.create(Parent.prototype);和 Child.prototype = new Parent();

// Child.prototype = Parent.prototype  Child.prototype = Parent.property
var Child_1 = {
  child: 1
}
var Child_2 = {
  child: 1
}
function Parent (){}
var a = Child_1.prototype = Object.create(Parent.prototype)

var b = Child_2.prototype = new Parent()

console.log(Object.getPrototypeOf(a) === Parent.prototype)
console.log(Object.getPrototypeOf(b) === Parent.prototype)
console.log(Object.getPrototypeOf(a) === Object.getPrototypeOf(b))

