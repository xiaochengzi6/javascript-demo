// call 实现

// call(context, arg1, arg2, arg3,...)
function my_call(func, context, args) {
  let result
  const attr = Math.random().toString(32).slice(2)

  if (typeof context == null && window) {
    context = window
  }

  if (args) {
    if (!isArray(args)) {
      throw TypeError('args is no array')
    } else {
      args = Array.from(args)
    }
    
    context[attr] = func
    result = context[attr](...args)
  }

  context[attr] = func()
  delete context[attr]

  return result
}



// call test 
const obj = {
  a: '1'
}
function func() {
  console.log(this.a)
}
var a = 'mycall'
const myCall = my_call(func, obj)


// apply 实现
function my_apply(func, context, args) {
  if (typeof context == null && window) {
    context = window
  }

  const attr = Symbol('my_apply')
  context[attr] = func
  const result = context[attr](args)
  delete context[attr]

  return result
}

// 特别的 appLy 的第二参数是类数组对象 也就是说只要满足以下规则都可以是类数组对象
/**
 * obj 不是 null undefined 
 * obj type: 'object'
 * obj.length type: 'number'
 * Math.pow(2, 32) < obj.length > 0 
 * obj.length 整数
 */

const isArray = (obj) => {
  if (
    obj
    && typeof obj === 'object'
    && obj.length
    && typeof obj.length === 'number'
    && obj.length === Math.floor(obj.length)
    && obj.length > 0
    && obj.length < Math.pow(2, 23)
  ) {
    return true
  }

  return false
}


// bind 的实现
Function.prototype.myBind = function (context, ...params){
  const _self = this 
  
  const FNOP = function () {} 
  
  const fBund = function (...args) {
    return _self.apply(this instanceof FNOP ? this : Object(context), params.concat(args))
  }
  
  FNOP.prototype = this.prototype
  fBund.prototype = new FNOP()

  return fBund
}

// test bind 

const build_obj = {
  a: 'build_obj_bind'
}
function buildFunc(a, b){
  this.a = a
  this.b = b 
}

const buildObj = buildFunc.bind(build_obj, 1)

const result = buildObj(2)

console.log(result)

const new_buildObj = buildFunc.bind(build_obj, 1)
const b_obj = new new_buildObj(2)
