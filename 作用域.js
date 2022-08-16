// javascript 采用静态作用域
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// js 采用词法作用域也是静态作用域，函数的作用域在函数定义的时候就已经决定了
// 动态作用域是在函数调用的时候决定

// JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的