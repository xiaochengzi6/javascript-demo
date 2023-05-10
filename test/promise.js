function createAsyncIterator(arr) {
  arr[Symbol.asyncIterator] = () => {
    return {
      i: 0,
      next() {
        this.i++
        if (this.i >= arr.length) {
          return Promise.resolve({ done: true })
        }

        return Promise.resolve({ value: arr[this.i](), done: false })
      }
    }
  }

  return arr
}

const timeoutVal = (ms, val) => new Promise(r => setTimeout(() => r(val), ms))

const func1 = () => timeoutVal(100, 1)
const func2 = () => timeoutVal(200, 2)
const func3 = () => timeoutVal(300, 3)

for await (let promise of createAsyncIterator([func1, func2, func3])) {
  // 同步执行
  console.log(promise)
}



function executePromise(iterators) {

  return new Promise((resolve, reject) => {
    const result = []

    try {
      // 串行执行
      iterators.reduce((pre, current) => {
        pre.then((data) => {
          result.push(data)

          return current()
        })
      }, Promise().resolve())
        .then((data) => {
          result.push(data)

          return resolve(result)
        })
    } catch (e) {
      reject(e)
    }
  })
}
