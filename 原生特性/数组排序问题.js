
// 一、排序
const numbers = [1, 6, 3, 7, 9, 5, 2]
numbers.sort((a, b) => a - b)

// 冒泡排序
// 这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端
const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1]

function bubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }

  return arr
}


// 插入排序
// 取到的元素会依次向前查，如果后一个比前一个小，就替换该元素
function insertSort(arr) {
  const handle = [arr[0]], len = arr.length

  for (let i = 1; i <= len - 1; i++) {
    const current = arr[i]
    // 遍历 handle 数组
    for (let j = handle.length - 1; j >= 0; j--) {
      if (current > handle[j]) {
        // 插入
        handle.splice(j + 1, 0, current)
        break
      }
      if (j === 0) {
        handle.unshift(current)
      }
    }
  }

  return handle
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }

  return arr
}

// 快排
// 通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，
//   然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

function quickSort(arr) {
  if (arr.length <= 1) return arr

  const index = Math.floor(arr.length / 2)
  const middle = arr.splice(index, 1)[0]

  const leftArr = [], rightArr = []

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    current < middle ? leftArr.push(current) : rightArr.push(current)
  }

  return quickSort(leftArr).concat(middle, quickSort(rightArr))
}

// 优化版本
function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

function partition(arr, start, end) {
  let j = start
  let pivot = arr[end]

  for (let i = start; i <= end; i++) {
    if (arr[i] <= pivot) {
      // 替换
      swap(arr, i, j++)
    }
  }

  return j - 1
}


function quickSort(arr, start = 0, end = arr.length - 1) {
  if(end - start < 2) return arr 
  // 中
  let pivotIndex = partition(arr, start, end)
  // 左
  quickSort(arr, start, pivotIndex - 1)
  // 右
  quickSort(arr, pivotIndex, end)

  return arr
}

// 快排：https://juejin.cn/post/6844903938915827725

// 参考：https://juejin.cn/post/6844904177504616461

// 二、去重
/**
 * 1. 双重 for 循环
 */
const uniques = [1,2,2,2,3,4,4,4,4,5,5,5,5,56,6,7,7,8,9,0]
function unique(arr) {
  if(!Array.isArray(arr)) return false 
  
  const len = arr.length, target = []
  for(let i = 0; i < len; i++){
    let isSame = false 
    for(let j = 0; j < target.length; j++){
      if(arr[i] == target[j]){
       isSame = true 
       break 
      }
    }

    if(!isSame){
      target.push(arr[i])
    } 
  }

  return target 
}


/**
 * 2. indexOf 
 */

function unique(arr) {
  if(!Array.isArray(arr)) return false 
  
  const len = arr.length, target = []
  for(let i = 0; i < len; i++){
    if(!~target.indexOf(arr[i])){
      target.push(arr[i])
    }
  }

  return target
}


/**
 * 3. Set
 */
(Array.from(new Set(uniques)))


/**
 * 4. 排序 + 相邻对比
 */

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    arr.sort()
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            res.push(arr[i])
        }
    }
    return res
}

/**
 * 5. 数组结构
 */

console.log([...new Set(uniques)])