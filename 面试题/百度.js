// 回文字符串
function checkStr(str) {
  return str === str.split('').reverse().join('')
}

// 下划线转中划线
function transFromStr(str) {
  return str.split('_').join('-')
}


// 驼峰转下划线
function transFromStr(str) {
  return str.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}

// 深递归比较
function deepEqual(x, y) {
  if (x === y) {
    return true
  }

  if (!isObject(x) || !isObject(y)) {
    return x === y
  }

  const key1 = Object.keys(x).length
  const key2 = Object.keys(y).length
  if (key1 !== key2) return false


  for (const key in x) {
    if (x[key] !== y[key]) {
      return false
    }
  }

  return false
}


function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}