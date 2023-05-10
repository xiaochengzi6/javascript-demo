
// object instanceof constructor 
// 用于检测 constructor.prototype 是否存在 object 的原型链上


// instanceOf 实现
function _instanceOf(left, right){
  let leftValue = left.__proto__
  const rightValue = right.prototype 

  while(true){
    if(leftValue === null){
      return false 
    }
    if(leftValue === rightValue){
      return true 
    }

    leftValue = leftValue.__proto__ 
  }
}

const obj = {}
const parent = function () {}
obj.__proto__ = parent.prototype

const isProto = obj instanceof parent
console.log(isProto)