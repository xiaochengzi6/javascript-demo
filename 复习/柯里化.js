function compose(fn) {
  if (typeof fn !== 'function') {
    throw TypeError('fn is no Function')
  }

  const length = fn.length
  const params = []

  const cycle = (length) => {

    if (length == 0) {
      return fn(...args)
    }

    return (value) => {
      if(Array.isArray(value)){
        throw SyntaxError('value type error')
      }
      params.push(value)
      
      return cycle(--length)
    }
  }

  return cycle(length)
}