;(function () {
  var root =
    (typeof self === 'object' && self === self.window && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this ||
    {}

  var _ = function (obj) {
    if (!(this instanceof _)) return new _(obj)
    this._wrapped = obj
  }

  root._ = _

  _.isFunction = function (obj) {
    return typeof obj === 'function'
  }

  _.function = function (obj) {
    var names = []
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key)
    }
    return names.sort()
  }

  var ArrayProto = Array.prototype
  var push = ArrayProto.push

  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name])
      _.prototype[name] = function () {
        var args = [this._wrapped]
        push.apply(args, arguments)
        return func.apply(_, args)
      }
    })
    return _
  }

  // 添加方法
  _.reverse = function (string) {
    return string.split('').reverse().join('')
  }

  _.mixin(_)
})()

// _.reverse => _.prototype.reverse 取出所有的函数 遍历的放入 prototype 中

// test
// 面向函数式调用
console.log(_.reverse('hello'))

// 面向对象式调用
console.log(_('hello'))
console.log(_('hello').reverse())
