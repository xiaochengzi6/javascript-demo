// 博客文章：https://github.com/xiaochengzi6/Blog/issues/3

// new 操作符的实现

// 1 创建一个对象
// 2 对象的原型指向目标原型
// 3 构造函数内部的 this 复制给这个新对象
// 4 执行构造函数代码（给新对象添加属性）
// 5 根据返回值去判断返回什么东西

function myNew(target) {
    if (!target || !typeof target === 'function') {
        return TypeError('构造函数不存在')
    }
    const args = [...arguments].slice(1)
    const obj = Object.create(target)
    const newObj = target.call(obj, args)
    return typeof newObj === 'object' && newObj !== null ? newObj : obj
}
