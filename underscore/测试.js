var _ = require('./index')
// var _ = require('./index_test_')
// 面向函数式调用
console.log(_.reverse('hello'))

// 面向对象式调用
console.log(_('hello').reverse())

console.log(_.chain([1, 2, 3, 4]).push(2))
