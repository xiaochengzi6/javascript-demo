function* generate(){
  var a = yield 'hello'
  yield 'word' + a
  return 'eding'
}

var value = generate()
console.log('value:', value) // value: Object [Generator] {}

var value_1 = value.next()
console.log('value_1:', value_1); // value_1: { value: 'hello', done: false }

// generate 函数调用就会返回一个生成器对象 
// 通过 next() 函数进行惰性求值从而计算每一次的 yield 表达式的值 填充到要返回对象中的 value 属性中
// 然而 yield 返回值为 undefined 
// 但可以通过 next() 往参数里传值 这个值就是上一次 yield 的返回值

// 需要注意：第一次调用 next() 是为了启动生成器对象，第一次传值无效，但可以包一层在里面调用一次 next() 
function wrapper(generateFunction){
  return function (...args) {
    let generateObject = generateFunction(...args)
    generateObject.next()
    return generateObject
  }
}

// 调用
var generate_2 = wrapper(generate)
var value_2 = generate_2().next(2)
console.log('value_2:', value_2)

// 原生 js 对象没有 symbol.iterate 接口不能使用 for...of 循环可以使用 generator 函数 让其能够使用 for ... of 

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)

  for(let propKey of propKeys){
    yield [propKey, obj[propKey]]
  }
}

let jane = {first: 'jane', last: 'Doe'}

for(let [key, value] of objectEntries(jane)){
  console.log(`${key}: ${value}`)
}

// 另一种写法是将其作为目标对象 symbol.iterate 的属性

function* objectEntries_0(){
  let propKeys = Object.keys(this)
  
  for(let propKey of propKeys){
    yield [propKey, this[propKey]]
  }
}

jane[Symbol.iterator] = objectEntries_0

for(let [key, value] of jane){
  console.log(`${key}: ${value}`)
}


function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口
// 当调用 for of 或者其他遍历器方法时 使其返回的对象属性 done: true 时就会停止遍历
console.log([...numbers()]);// [1, 2]

Array.from(numbers()) // [1, 2]


// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
// 这点非常特殊，在函数体外抛错，体内捕获
// 如果内层没有捕获，外层就会捕获，若外层也没有 try{} catch(){} 那就会抛错 停止运行
//  throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。

function* gen(){
  try{
    yield 1
  }catch(e){
    console.log(e)
  }
}

var g = gen()
g.next()
g.throw('q') // q

// 因为第一次执行next方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在函数外部。

// throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。



// Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了
// 如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

// Generator 函数返回的遍历器对象，还有一个return()方法，可以返回给定的值，并且终结遍历 Generator 函数。
// 如果return()方法调用时，不提供参数，则返回值的value属性为undefined。

// 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return()方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。

function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
var a = gen.next() // 返回一个遍历器对象
var b = gen.next() // "close"
console.log('a', a)
console.log('b', b)


// 使用 yield* 语法 取出嵌套数组

function* iterate(tree){
  if(Array.isArray(tree)){
    for(let i=0; i < tree.length; i++){
      yield* iterate(tree[i]) 
    }
  }else{
    yield tree 
  }
}

const tree = [1, [2,[3,4,[5]]]]
for(let x of iterate(tree)){
  console.log(x);
}

// ... 扩张运算符默认调用 Iterate 接口 所以也可以用到嵌套数组中

console.log([...iterate(tree)]);// ["a", "b", "c", "d", "e"]


