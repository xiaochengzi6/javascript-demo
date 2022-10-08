var settings = {
  // 求值
  evaluate: /<%([\s\S]+?)%>/g,
  // 插入
  interpolate: /<%=([\s\S]+?)%>/g
}

var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
}

var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g

var template = function (text) {
  var source = "var __p='';\n"
  source = source + 'with(obj){\n'
  source = source + "__p+='"

  var main = text
    .replace(escapeRegExp, function (math) {
      return '\\' + escapes[match]
    })
    .replace(settings.interpolate, function (match, interpolate) {
      return "'+\n((__t=(" + interpolate + "))=null?'':__t+\n'"
    })
    .replace(settings.evaluate, function (match, evaluate) {
      return "';\n" + evaluate + "\n__p+='"
    })

  source = source + main + "';\n }; \n return __p;"

  var render = new Function('obj', source)

  return render
}

// 最终版：https://github.com/mqyqingfeng/Blog/blob/master/demos/template/template8/template.js
