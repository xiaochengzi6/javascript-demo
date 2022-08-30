;(function () {
  /*浏览器/WebWorker node/node沙箱 小程序*/
  var root = (typeof self === 'object' && self === self.window && self) || (typeof global === 'object' && global.global === global && global) || this || {}

  var ArrayProto = Array.prototype

  var push = ArrayProto.push

  var _ = function (obj) {
    if (obj instanceof _) return obj
    if (!(this instanceof _)) return new _(obj)
    this._wrapped = obj
  }

  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _
    }
    exports._ = _
  } else {
    root._ = _
  }

  _.VERSION = '0.1'

  // 判断是否是函数
  _.isFunction = function (obj) {
    return typeof obj == 'function' || false
  }

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1

  // 判断是否是数组
  _.isArrayLike = function (obj) {
    var length = obj.length
    if (obj && length >= 0 && length === Math.floor(length) && length === Math.abs(length) && length < MAX_ARRAY_INDEX) {
      return true
    }
    return false
  }

  // 返回 obj 上所有的函数名
  _.functions = function (obj) {
    var names = []
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key)
    }
    return names.sort()
  }
  // 遍历函数
  _.each = function (obj, callback) {
    var length,
      i = 0

    if (_.isArrayLike(obj)) {
      length = obj.length
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break
        }
      }
    }

    return obj
  }
  _.identity = function (value) {
    return value
  }

  var cb = function (value, context, argCount) {
    if (value == null) return _.identity
    if (_.isFunction) return optimizCbe(value, context, argCount)
    if (_.isObject) return _.mathcer(value)
    return _.property
  }

  // 添加方法
  _.reverse = function (string) {
    return string.split('').reverse().join('')
  }

  _.map = function (obj, iteratee, context) {
    var iteratee = cb(iteratee, context)
    var i = 0,
      length = obj.length,
      result

    for (; i < length; i++) {
      result[i] = iteratee(obj[i], i, obj)
    }
    return result
  }

  _.chain = function (obj) {
    var instance = _(obj)
    instance._chain = true
    return instance
  }

  var chainResult = function (instance, obj) {
    return instance._chain ? _(obj).chain() : obj
  }

  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
    _['is' + name] = function (obj) {
      return this.toString.call(obj) === '[object' + name + ']'
    }
  })

  // 将 _ 上的函数全部注册到原型链上
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name])
      _.prototype[name] = function () {
        var args = [this._wrapped]

        push.apply(args, arguments)

        return chainResult(_, func.apply(_, args))
      }
    })
    return _
  }

  _.mixin(_)

  _.prototype.value = function () {
    return this._wrapped
  }
  _.prototype.push = function (num) {
    push.call(this._wrapped, num)
    return this
  }
})()
