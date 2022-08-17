// 参考文章： https://github.com/mqyqingfeng/Blog/issues/26
// 节流：一段时间内只会触发一次的操作
// 实现的方式主流的有两种
// 时间戳
// 定时器

//---------------------- 时间戳实现
function throttle(func, wait) {
  var previous = 0
  var _self = this
  return function () {
    var args = arguments
    var now = +new Date()
    if (now - previous > wait) {
      func.apply(_self, args)
      previous = now
    }
  }
}
// ---------------------- 定时器实现
function throttle(func, wait) {
  var timer,
    previous = 0
  return function () {
    var args = arguments
    var _self = this
    if (!timer) {
      timer = setTimeout(function () {
        timer = null
        func.apply(_self, args)
      }, wait)
    }
  }
}

// 参考文章： https://github.com/xiaochengzi6/Blog/issues/25
// 防抖：每次触发都会延迟一段时间去执行
// 应用场合：频繁触发的事件

function debounce(func, wait) {
  var timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, wait)
  }
}

//---------------------- 处理 this 的问题
function debounce(func, wait) {
  var timer
  return function () {
    var _self = this
    clearTimeout(timer)
    timer = setTimeout(func.call(_self), wait)
  }
}

//---------------------- 函数接收事件[参数]
function debounce(func, wait) {
  var timer
  return function () {
    var _self = this
    var args = [].slice.call(arguments)
    clearTimeout(timer)
    timer = setTimeout(func.apply(_self, args), wait)
  }
}

// 节流分成两种：
// 一种是事件触发暂停一段时间后去响应
// 另一种是事件触发便响应事件暂停一段时间后才能去触发事件

//---------------------- 兼容第一种和第二种通过 immediate 去触发
function debounce(func, wait, immediate) {
  var timer, current
  return function () {
    var args = [].slice.call(arguments)
    var _self = this

    // 这里设计的很巧妙
    if (timer) clearTimeout(timer) // 有就清空
    if (immediate) {
      current = !timer // 没有定时器的绑定就说明要执行
      timer = setTimeout(function () {
        timer = null // 定时器执行完继续让其为null
      }, wait)
      if (current) {
        func.apply(_self, args)
      }
    } else {
      timer = setTimeout(func.apply(_self, args), wait)
    }
  }
}

//---------------------- 函数在特殊场合下需要返回值的情况
function debounce(func, wait, immediate) {
  var timer, current, result
  return function () {
    var args = [].slice.apply(arguments)
    var _self = this

    if (timer) clearTimeout(timer)
    if (immediate) {
      current = !timer
      timer = setTimeout(function () {
        timer = null
      }, wait)
      if (current) {
        result = func.apply(_self, args)
      }
    } else {
      timer = setTimeout(func.apply(_self, args), wait)
    }

    return result
  }
}

//---------------------- 函数可以取消
function debounce(func, wait, immediate) {
  var timer, current, result
  function debounced() {
    var _self = this
    var args = [].splice.call(arguments)
    if (timer) clearTimeout(timer)
    if (immediate) {
      current = !timer
      timer = setTimeout(function () {
        timer = null
      }, wait)
      if (current) {
        result = func.apply(_self, args)
      }
    } else {
      timer = setTimeout(func.apply(_self, args), wait)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

//----------------------总结----------------------

// 这次的防抖函数从这些方面去考虑了防抖函数的实现

// 1 考虑是否需要 this
// 2 是否需要 事件 event
// 3 事件的响应是在触发后响应还是等待一段时间响应
// 4 需要返回值吗?
// 5 需要取消这次的防抖？
