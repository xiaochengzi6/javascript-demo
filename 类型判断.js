function log(value){
  console.log(typeof value)
}
// 参考文章：js 类型判断 https://github.com/mqyqingfeng/Blog/issues/28

// 标题：《针对 js 类型判断的解决方案》

// typeof 能够检测出这些类型 number string undefined boolean object function 

// javascript 的类型有: BigInt Number Object String Boolean Null Undefined Symbol

// 简单类型：Number String Null Undefined Symbol BigInt Boolean 复杂类型：Object

// 针对简单类型可以使用 typeof 一元操作符 对于复杂类型或者 typeof 不能检测出来的只能使用其他判断条件

function Typeof(target) {
  return typeof target;
}

// 关于 js 的类型判断有很多种方法比如

// typeof 操作符
// constructor 函数
// instanceof 操作符
// Object.property.toString 函数

// 这几种方法的优缺点
// 1. 使用 typeof 只能检测出简单类型值针对复杂类型检测不出来
// 2. 使用 constructor 可以得到实例对象的原型但是 constructor 的值可以人为的改变的
// console.log('22'.constructor === String)             // true
// console.log(true.constructor === Boolean)            // true
// console.log([].constructor === Array)                // true
// console.log(document.constructor === HTMLDocument)   // true
// console.log(window.constructor === Window)           // true
// console.log(new Number(22).constructor === Number)   // true
// console.log(new Function().constructor === Function) // true
// console.log((new Date()).constructor === Date)       // true
// console.log(new RegExp().constructor === RegExp)     // true
// console.log(new Error().constructor === Error)       // true

let number_1 = {"value": 22}
// console.log(number_1.constructor === Object)       // true
number_1.constructor = Array;
// console.log(number_1.constructor === Array)        // true

// 所以使用这种方式检测并不可靠

// 3. 使用 instanceof 去检测
// console.log(12 instanceof Number)            // false
// console.log('22' instanceof String)          // false
// console.log(true instanceof Boolean)         // false
// console.log(null instanceof Object)          // false
// console.log(undefined instanceof Object)     // false

// console.log([] instanceof Array)             // true
// console.log({a: 1} instanceof Object)        // true
// function a() {}
// console.log(a instanceof Function)           // true
// console.log(new Date() instanceof Date)      //true
// console.log(/^12345$/ instanceof RegExp)     //true
// console.log(new Error() instanceof Error)    // true

// instanceof 只能检测出复杂类型，而且使用这个主要是用于判断构造函数的原型
function Ber () {}
let ber_1 = new Ber()
// console.log(ber_1 instanceof Function)       // false
// console.log(ber_1 instanceof Ber)            // true
// 而且这种判断并不适合检测行为的判断，它只能针对单一类型的判断

// 4. 最后一种很强大 能够判断很多种类型，也没有什么限制性条件，直接调用就行
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function Typeof (target){
  return Object.prototype.toString(target)
}

// 优化一下
function Typeof (target) {
  let type = typeof target;
  // 兼容 BigInt 类型
  if(type === "object" || type === "string"){
    type = Object.prototype.toString.call(target).slice(8, -1)
  }
  console.log(type)
}


// 让其能够处理 NaN 
function Typeof (target) {
  let type = typeof target;
  // 兼容 BigInt 类型
  if(type === "object" || type === "string"){
    type = Object.prototype.toString.call(target).slice(8, -1)
  }
  // NaN
  if(type === "number" && target !== target){
    type = "number: NaN"
  }
  console.log(type)
}

// plainObject 来自于 jQuery，可以翻译成纯粹的对象，所谓"纯粹的对象"，就是该对象是通过 "{}" 或 "new Object" 创建的，该对象含有零个或者多个键值对。

// 处理 plainObject 对象
function Typeof (target) {
  let type = typeof target;

  // 兼容 BigInt 类型
  if(target instanceof BigInt) return "BigInt"

  // NaN
  if(type === "number" && target !== target){
    return type = "number: NaN"
  }

  if(type === "object"){
    type = Object.prototype.toString.call(target).slice(8, -1);
    
    // 处理空对象
    if(type !== "object") return type
    let obj = {}, prop, Cotr
    prop = Object.getPrototypeOf(target)
    
    // 没有原型的对象
    if(!prop){
      return "object: plainObject"
    }

    // 取出 constructor 
    Cotr = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    // 这里的 Object.prototype.hasOwnProperty 是一个函数然后调用了 toString 函数得到的是函数的源代码
    // 这里其实就是比较传入的对象的原型和Object对象的原型的代码是否相同
    if(Cotr === 'function' && Object.prototype.hasOwnProperty.toString.call(Ctor) === Object.prototype.hasOwnProperty.toString.call(Object)){
      return "object: plainObject"
    }

    let current = false;
    // 判断是不是空对象 即为对象中没有属性
    for(let value of target){
      current = true;
    }
    if(!current) return "object: EmptyObject";

    // 判断是不是数组
  }
  
  return type
}


// 小插曲
// for in  和 for of 的区别
// 前者是 es5 的后者是 es6 中的语法
// 前者是遍历对象中键值对中的键名的，比如遍历对象就是返回对象的属性名，遍历数组返回数组的下标
for (var key in {str: '1', num: 2, boo: true}){
  console.log(key)
}
for (var a in [1, 2, 3]){
  console.log(a)
}
// 最关键的是使用 for in 可以遍历找到对象上原型的属性，但这个特点在某些场合又需要规避所以要格外注意
var obj = {str: 'str'};
var obj_2 = Object.create(obj);

for (var value in obj_2){
  console.log(value)
}

// 规避的方式使用 Object.hasOwnProperty.call(obj, 'prototype')
// 例外一点就是object 对象可以覆盖这个函数，所以使用 Object 的方式或者 ({}).hasOwnProperty 的这种比较安全

// for of 主要是用来遍历对象中的属性的，当然它遍历的东西不只有对象，任何具备 Symbol.Iteratoer 接口的都可以去遍历比如
// map, array, set, string, arguments, Nodelise

for (let value of [4,2,3]){
  console.log(value)
}

func_arguments(1,2,3,4,5)
function func_arguments (...args){
  let a = arguments;
  console.log(Object.prototype.toString.call(arguments))
}




// 向下兼容


