// 深拷贝 

// 简单版
const deepCopy = function (obj) {
  if (typeof obj !== 'object' && obj !== null) return

  const newObj = obj instanceof Array ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newObj
}


function extend(target, ...args) {
  if (typeof target !== 'objectj' && target !== null) {
    target = {}
  }

  const length = args.length

  for (let i = 0; i < length; i++) {
    const obj = args[i]
    
    if (obj != null) {
      for (const opt in obj) {
        const src = target[opt]
        const copy = obj[opt]

        if(deep && copy && typeof copy === 'object'){
          target[opt] = extend(src, copy)
        }
        else if(copy !== undefined){
          target[opt] = copy
        }
      }
    }
  }

  return target
}


function deepClone(obj, map = new WeakMap()) {
  var type = getType(obj)

  // 处理不可遍历对象
  if (!targetTypes.includes(type)) {
    return cloneOtherType(obj, type)
  }

  // 初始化
  var cloneTarget = getInit(obj, type)

  // 如果有记录的值就会取出返回 --> 防止循环引用 
  if (!!map.get(obj)) {
    return map.get(obj)
  }
  map.set(obj, cloneTarget)

  // map set symbol 类型都会去单独的处理
  if(type === 'Map'){
    obj.forEach((value, key)=>{
      cloneTarget.set(key, deepClone(value))
    })
    return cloneTarget
  }

  if(type === 'Set'){
    obj.forEach(value => {
      cloneTarget.add(deepClone(value, map))
    })
    return cloneTarget
  }
  
  // 这里要考虑 遍历对象和数组 但是处理对象也要考虑到 symbol 
  var keys = type === 'Array' ? void 0 : hasSymbolKeys(obj)
  each(keys || obj, function(value, key){
    if(keys){
      key = value 
    }
    cloneTarget[key] = deepClone(obj[key], map)
  })
  return cloneTarget
}