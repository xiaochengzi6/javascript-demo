function isArrayLike(target) {
  if (
    target &&
    target.length >= 0 &&
    target.length === Math.floor(target.length) &&
    target.length === Math.abs(target.length) &&
    target.length < Math.pow(2, 32)
  ) {
    return true
  }
  return false
}

function each(obj, callback) {
  var length,
    i = 0

  if (isArrayLike(obj)) {
    length = obj.length
    for (; i < length; i++) {
      // 为了能够使用 this 来指向当前值
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }
  return obj
}
