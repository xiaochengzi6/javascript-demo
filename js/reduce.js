// reduce(callback, initValue)
// reduce((previousValue, currentValue, currentIndex, array) => void, initValue)

function reduce(array, callback, initValue) {
  let currentValue, currentIndex, index

  if (initValue) {
    previousValue = initValue
    index = 0
  } else {
    previousValue = array[0]
    index = 1
  }

  for (index; index < array.length; index++) {
    currentValue = arr[i]
    currentIndex = i
    previousValue = callback(previousValue, currentValue, currentIndex, array)
  }

  return previousValue
}

// 多维数组的展开
const targetArray = [1, [2,3,[4,5,[6,7]]]]

const flatArray = arr => arr.reduce((pre, value) => {
  return Array.isArray(value)
    ? pre.concat(flatArray(value)) 
    : pre.concat(value)
}, [])


console.log(flatArray(targetArray))

// 组合函数
const compose = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args))
  })
}

