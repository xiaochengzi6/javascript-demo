// +new Date() === new Date().getTime()
// 解释 + 转换的原因：https://github.com/mqyqingfeng/Blog/issues/26#issuecomment-324270420

// 节流：持续的触发事件，在一段时间段内，触发这一次函数
// 防抖：持续的触发事件，每次触发都会延长一定的时间执行

// 区别； 防抖是只会只会执行连续触发的最后一次触发
//       节流是这段时间内只会触发这一次，其他的忽略

// 场景：1.防抖用来处理用户输入方面，或者持续点击触发事件
//       2. 节流可用于点击请求资源这一方面，或者屏幕滚动

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
  var timer
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

// 这两种方法的特点：
// 使用时间戳的第一次触发会立即执行，停止触发后没有办法再执行事件
// 使用定时器的第一次触发后会等待一段时间才能执行，停止触发后依然会执行一次

// 结合上面特点：第一次触发事件立刻响应，停止触发再执行一次

function throttle(func, wait){
 var timeout, context, args, result
 var previous = 0
 
 var later = function (){
  previous = +new Date()
  timeout = null
  func.apply(context, args)
 }

 var throttle = function(){
  var now = +new Date()
  var remaining = wait -(now - previous)
  context = this
  args= arguments
  // 第一次 || (再触发时间超过 wait)
  if(remaining <= 0 || remaining > wait){
    if(timeout){
      clearTimeout(timeout)
      timeout = null
    }
    previous = now
    result = func.apply(context, args)
  }
  // 再触发时间不超过 wait 并且timer 没有定时
  else if (!timeout){
    timeout = setTimeout(later, remaining)
  }
  return result
 }

 return throttle
}

// 优化：第一次触发最后一次不触发，或者最后一次触发，第一次不触发
// options= {leading: Boolean, trailing: Boolean}
function throttle (func, wait, options){
  var timeout, context, args, result
  var previous = 0
  if(!options) options = {}
  var later = function (){
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    func.apply(context, args)
    if(!timeout) context = args = null /*释放内存*/
  }

  function throttled(){
    var now = +new Date()
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous)
    // 这里兼容了修改系统时间也会去响应事件(remaining > wait)
    if((remaining <= 0 || remaining > wait) && options.leading){
      // 处理timeout定时器
      if(timeout){
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if(timeout) context = args = null
    }
    else if(!timeout && options.trailing !== false){
      timeout = setTimeout(later, remaining)
    }
    return result
  }
  // 取消响应
  throttled.cancel = function (){
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}

//----------------------总结----------------------
//  节流的主流实现方法有两种 每种都有不同的特点，使用时间戳的问题第一次会立即响应，停止触发事件后不会响应最后的一次触发请求
//  使用定时器的第一次不会立即响应，最后一次请求会延迟响应
