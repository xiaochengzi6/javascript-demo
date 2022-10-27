// "hello <%> name </%>" ==> "hello word"

/**
<%for ( var i = 0; i < users.length; i++ ) { %>
    <li>
        <a href="<%=users[i].url%>">
            <%=users[i].name%>
        </a>
    </li>
<% } %>
 */

// 转换为

var users = [{ name: 'Kevin', url: 'http://localhost' }]

var p = []
for (var i = 0; i < users.length; i++) {
  p.push('<li><a href="')
  p.push(users[i].url)
  p.push('">')
  p.push(users[i].name)
  p.push('</a></li>')
}

console.log(p.join(''))
// <li><a href="http://localhost">Kevin</a></li>

// 可以看成这样
/** 
 // 添加的首部代码
var p = []; p.push('

');for ( var i = 0; i < users.length; i++ ) { p.push('
    <li>
        <a href="');p.push(users[i].url);p.push('">
            ');p.push(users[i].name);p.push('
        </a>
    </li>
'); } p.push('

// 添加的尾部代码
');
*/

// 参考文章 [underscore 系列之实现一个模板引擎(上)](https://github.com/mqyqingfeng/Blog/issues/63)

// 1、使用了 with 这样可以传入一个对象在模板中直接使用其属性就行
// 2、通过返回一个函数可以对其进行跟新数据的操作这样的好处是不用每次都去 new Function()

function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML

  var fn = new Function(
    'obj',
    "var p = []; with(obj) {p.push(' " +
      str
        .replace(/[\r\t\n]/g, '')
        .replace(/<%=(.*?)%>/g, "'); p.push($1); p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');}return p.join('');"
  )

  var template = function (data) {
    return fn.call(this, data)
  }
  return template
}
