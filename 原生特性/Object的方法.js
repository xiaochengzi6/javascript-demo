// 1. Object.create(proto, propertiesObject)
// proto: 新建对象的原型对象
// propretiesObject: 参考 Object.defineProperties() 的第二参数 一般传参为 undefined 

// {
//   configurate,
//   enumerable,
//   value,
//   get,
//   set,
//   writable,
// }

function create(proto, propertiesObject) {
  const obj = {}
  obj.setPrototypeOf(proto)

  if(propertiesObject != null){
    Object.defineProperties(obj, propertiesObject)
  }

  return obj 
}

// 2. Object.assign(target, ...source)
// 返回 被修改的 target 源对象

function assign(target, ...sources) {

  while(sources.length){
    const source = sources.shift()

    for(const key in source) {
      if({}.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }

  return target 
}