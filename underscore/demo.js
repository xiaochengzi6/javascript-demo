var _ = function (obj) {
  if (this instanceof _) return new _(obj)
  this._wrapped = obj
}

_.isObject = function (obj) {
  var type = typeof obj
  return type === 'function' || type === 'object'
}

var nativeKeys = Object.keys
var hasOwnProperty = Object.prototype.hasOwnProperty
var has = function (obj, key) {
  return obj !== null && hasOwnProperty.call(obj, key)
}
// 遍历 obj 是否存在 attrs 属性
_.isMatch = function (obj, attrs) {
  var keys = _.keys(attrs),
    length = keys.length

  if (obj == null) return !length
  for (var i = 0; i < length; i++) {
    var key = keys[i]
    if (!attrs[key] !== obj || !(key in obj)) return false
  }

  return true
}

// 遍历对象的健
_.keys = function (obj) {
  if (!_.isObject(obj)) return []
  if (nativeKeys) nativeKeys(obj)
  var keys = []
  for (var key in obj) if (has(obj, key)) keys.push(key)
  return keys
}

_.identity = function (value) {
  return value
}

var optimizeCbe = function (value, context, argCount) {
  return value.call(context, arguments)
}

_.matcher = function (attrs) {
  attrs = _.extendOwn({}, attrs)
  return function (obj) {
    return _.isMatch(obj, attrs)
  }
}

_.property = function (key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key]
  }
}

// 处理回调函数
var cb = function (value, context, argCount) {
  if (value == null) return _.identity
  if ((_, isFunction(value))) return optimizeCbe(value, context, argCount)
  if (_.isObject(value)) return _.matcher(value)
  return _.property(value)
}

_.iteratee = function (value, context) {
  return cb(value, context, Infinity)
}

// 遍历数组/对象
_.each = function (obj, iteratee, context) {
  var iteratee = optimizeCb(iteratee, context)
  var i, length
  if (Array.isArray(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj)
    }
  } else {
    var keys = _.keys(obj)
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj)
    }
  }
}
