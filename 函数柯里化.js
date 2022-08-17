// 函数柯里化的核心：
// 接受参数，参数达到相应个数时候就可以去执行原函数

// 降低通用性，提高适配性

// 有两种思路：

// 1 通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
// 2 在调用柯里化工具函数时，手动指定所需的参数个数

// 方法一

function curry(fn, len = fn.length){
  return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args){
  return function (...params){
    let _args = [...args, ...params]
    if(_args.length >= len){
      return fn.apply(this, _args)
    }else{
      return _curry.call(this, fn, len, ..._args)
    }
  }
}



var _fn = curry(function(a,b,c,d,e){
  let sum = a + b + c + d + e
  console.log(sum)
});

_fn(1,2,3,4,5);     // print: 1,2,3,4,5
_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
_fn(1,2)(3,4)(5);   // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5



// 方法er 


function curry (fn, len){
  return _curry.call(this, fn, len)
}

function _curry (fn, len, ...args){
  return function (...params){
    var value = [...args, ...params]
  if(value.length >= len){
    return fn.apply(this, value)
  }else{
    return _curry.call(this, fn, len, ...args)
  }
}
}

var _fn = curry(function(a,b,c,d,e){
  let sum = [a, b, c, d, e]
  console.log(sum)
}, 5);

_fn(1,2,3,4,5);     // print: 1,2,3,4,5
_fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
_fn(1,2) // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5