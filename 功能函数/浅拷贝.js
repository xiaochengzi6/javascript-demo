const shallowCopy = function (obj) {
  if(typeof obj !== 'object') return 

  const newObj = obj instanceof Array ? [] : {}

  for(const key in obj) {
    if(obj.hasOwnProperty(key)){
      newObj[key] = obj[key]
    }
  }

  return newObj 
}