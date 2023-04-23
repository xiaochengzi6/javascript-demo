// 函数柯里化
// fn(1,2,3) => fn(1)(2)(3) 


function compose(fn) {
  if (typeof fn !== 'function') {
    throw TypeError('fn is no function')
  }
  let length = fn.length
  const args = []

  const cycel = (length) => {
    if (length == 0) {
      const lastIndex = args.findLastIndex(ele => ele === '_')
      const rep = args.filter(ele => ele === '_')

      if(args.length - lastIndex < rep.length){
        throw TypeError('传入的参数不够替换的')
      }

      if(!~lastIndex){
        rep.forEach(ele => {
          // 其实这里是有问题的 它只能确保在 [_, _, _, 1, 3, 5] 这样的方式去进行替换
          // 比如[_, 1, _, 3, 5] 这就不行了
          args[ele] = args[lastIndex + ele] 
        })           
      }

      return fn(...args)
    }

    return (value) => {
      args.push(value)
      return cycel(--length)
    }
  }

  return cycel(length)
}
const test = (a, b, c, d) => a + b + c + d

const _fn = compose(test)

console.log(_fn(1, 2, 3, 4, 5) )
console.log(_fn(_, 2, 3, 4, 5)(1) )
console.log(_fn(1, _, 3, 4, 5)(2) )
console.log(_fn(1, _, 3)(_, 4, _)(2)(5) )
console.log(_fn(1, _, _, 4)(_, 3)(2)(5) )
console.log(_fn(_, 2)(_, _, 4)(1)(3)(5) )