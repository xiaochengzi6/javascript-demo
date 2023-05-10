// Element.scrollHeight 为元素高度 包含不可见位置
// Element.scrollWidth 为元素宽度 包含不可见位置

// 前面两个都是 元素内容的度量

// 在没有滚动条时 scrollHeight 等于 clientHeight 

// Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数.
// Element.scrollLeft 属性可以读取或设置元素滚动条到元素左边的距离.


// MouseEvent.clientX/Y也就是相对于当前视口(浏览器可视区)进行位置计算。

// Element.clientWidth/clinetHeight 属性表示元素的内部宽度

// HTMLElement.offsetWidth/Height 是一个只读属性，返回一个元素与父级元素的填充量，也就是说 offsetHeight 返回 子元素上边框到父元素上边款的距离
// 当祖先元素中有定位元素(或者上述标签元素)时，它就可以被称为元素的offsetParent

// window.innerHeight 返回浏览器视口高度


// 图片懒加载

// element.getBoundingClientRect().top < window.innerHeigth 才会设置 

// 参考： 位置计算 https://juejin.cn/post/7086350168693407757