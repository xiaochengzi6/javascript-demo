// 参考文章：[汤姆大叔-函数作用域]https://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html

// 函数的生命周期： 1、创建阶段 2、执行阶段

// 创建阶段：
// 1、创建变量对象 VO: 每个上下文都有变量对象里面存有所有的函数和变量
// 2、确定 this 
// 3、创建作用域链


// [[scope]]是所有父变量对象的层级链，处于当前函数上下文之上，在函数创建时存于其中。
// 函数的当前的作用域 scope = AO + [[scope]] => scope = AO.concat([[scope]]) 

// 函数每一次标识符查找(变量查询)都会沿着作用链的方式向上查找，但是由于有了 [[scope]] 所以查找方式就从 [AO -> [[scope]]] => next(scope[作用域])

var z = 10;

function foo() {
  alert(z);
}

foo(); // 10 – 使用静态和动态作用域的时候

(function () {

  var z = 20;
  foo(); // 10 – 使用静态作用域

})();

// 将foo作为参数的时候是一样的
(function (funArg) {

  var z = 30;
  funArg(); // 10 – 静态作用域
})(foo);

// 这里就解释了函数的运行方式

// 比较特殊的使用构造函数创建的函数
foo()
function foo (){
  var y = 1
  var a = function (){
    console.log(y)
  }
  var b = Function('console.log(y)') // y is undefined

  a()
  b()
}

// 按照之前的函数创建好后都会伴随着一个 [[scope]] 的函数属性，里面放着父变量对象层级链
// 所以函数 a  能访问到 y 变量，使用 Function() 这种方式每一次都是调用的全局对象，所以 b 函数的 [[scope]] 存放的是全局对象的变量对象，所以根本获取不到
