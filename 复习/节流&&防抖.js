function debounce(func, wait, isFirst) {
  let timer, result;

  const debounced = (...args) => {
    if (timer) clearTimeout(timer)

    if (isFirst) {
      result = func.apply(this, args)
      timer = setTimeout(() => timer = null, wait)
    } else {
      timer = setTimeout(() => func.apply(this, args), wait)
    }
    return result
  }

  debounced.exit = function () {
    timer && clearTimeout(timer)
    timer = null
  }

  return debounced
}

// 时间戳的方法
// 特点：最后一次触发的无法执行
function throttle(func, wait) {
  let previous = 0

  return (...args) => {
    const current = +new Date()
    if (current - previous > wait) {
      func.apply(this, args)
      previous = current
    }
  }
}

// 定时器的方法
// 特点第一次触发需要等待 wait 时间，最后一次可以触发
function throttle(func, wait) {
  let timer

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => func.apply(this, args), wait)
    }
  }
}

// 结合版本： 第一次触发，最后一次触发
/**
 * 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options {leading: Boolean, trailling: Boolean}
 * @returns 
 */
function throttle(func, wait, options) {
  let result, previous = 0, timer

  const later = (args) => {
    previous = options.leading ? +new Date() : 0
    timeout = null
    func.apply(this, args)
  }

  const throttled = (...args) => {
    const now = +new Date()
    const restTime = wait - (now - previous)
    if ((restTime < 0 || restTime > wait) && options.leading) {
      if (timer) {
        clearTimeout(timer)
      }
      previous = now
      result = func.apply(this, args)
    }
    else if (!timer && options.trailling) {
      timer = setTimeout(() => later(args), restTime)
    }

    return result
  }

  return throttled
}