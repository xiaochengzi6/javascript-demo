// Object.assign 可以将所有可枚举属性的自有属性从一个源或多个源对象复制到目标对象，
// 返回修改后的对象
// Object.assign(target, obj1, obj2, ...)

function assign (target){
  const args = arguments.slice(1)
  for(var i = 0; i < args.length; i ++){
    const obj = args[i]
    
    if( obj == null ||  typeof obj !== 'object'){
      throw TypeError('params no object type')
    }

    for(var key in obj){
      if({}.hasOwnProperty.call(obj, key)){
        target[key] = obj[key]
      }
    }
  }

  return target 
}