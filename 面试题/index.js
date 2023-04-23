// 题目1
// 编写函数convert(money)，传入金额，将金额转换为千分位表示法，如输入 1293213 ，输出 1,293,213
const convert = function (money) {
  let _money = String(money)
  let result = ''
  while (_money) {
    const reg = _money.slice(-3)
    result = reg + ',' + result
    _money = _money.slice(0, -3)
  }

  return result
}
console.log('convert', convert(1293213))

// 题目2 完成 convert2(list) 函数，实现将 list 转为 tree

/**
 * @param list {object[]},
 * @param parentKey {string}
 * @param currentKey {string}
 * @param rootValue {any}
 * @return object
 */

function convert2(list, parentKey, currentKey, rootValue) {

  const findKey = (arrs, key, value) => arrs.filter(arr => arr[key] === value)

  const childs = findKey(list, parentKey, rootValue)

  const eachObj = (childs) => (childs.map(ele => {
    if ('parentId' in ele) {
      if (ele.parentId !== rootValue) {
        const result = convert2(list, parentKey, currentKey, ele[parentKey])
        return result ? result : ele
      }
      const childs = findKey(list, parentKey, ele[currentKey])
      if (childs) {
        const result = convert2(list, parentKey, currentKey, ele[currentKey])
        if (result) {
          ele.children = []
          ele.children.push(result)
          return ele
        }
      }
    }

    return ele
  }))

  if (childs.length > 0) {
    return {
      parentId: rootValue,
      children: eachObj(childs)
    }
  }

  return false
}

const list = [
  {
    id: 19,
    parentId: 0,
  },
  {
    id: 18,
    parentId: 16,
  },
  {
    id: 17,
    parentId: 16,
  },
  {
    id: 16,
    parentId: 0,
  },
]

const result = convert2(list, 'parentId', 'id', 0)
console.log('convert', JSON.stringify(result))



const tree = {
  id: 0,
  children: [
    {
      id: 19,
      parentId: 0,
    },
    {
      id: 16,
      parentId: 0,
      children: [

        {
          id: 18,
          parentId: 16,
        },
        {
          id: 17,
          parentId: 16,
        },
      ],
    },
  ],
}

// 题目3
// 给定一个未排序的整数数组，找出最长连续序列的长度。
// 示例:
// 输入: [100, 4, 200, 1, 3, 2]
// 输出: 4
// 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
const longestConsecutive = function (nums) {
  const map = new Map()
  let index = 1
  nums.forEach(num => map.set(num, num))

  nums.forEach(num => {
    const key = num - 1
    if(map.has(key)){
      index ++ 
    }
  })

  return index
}

console.log('longestConsecutive', longestConsecutive([100, 4, 200, 1, 3, 2]))


// 题目4
// 实现一个简单的模板引擎（用replace 和不用 replace）

// 用replace
function template(str) {
  
}

// 不用replace
// function template(str) {

// }

const tpl = template('<p>hey there {{ name }} {{ name }}</p>')
const res = tpl({ name: 'Neo' })

console.log('template', res)