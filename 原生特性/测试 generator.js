function* gen() {
  yield console.log(1)
  yield console.log(2)
  yield console.log(3)
}
var g = gen()
var value_0 = g.next()
console.log('value_0: ', value_0);

var value_1 = g.next()
console.log('value_1: ', value_1);

var value_2 = g.return(3)
console.log('value_2', value_2)