// 内存泄漏的核心原因在于：没有进行垃圾回收
// 常见的场景：闭包

// 这也是闭包
function func(){
  const array =  new Array(19)
  return function(){
    console.log('ssssss')
  }
}