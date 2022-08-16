// 工厂模式
function createPerson(name) {
  const o = {}
  o.name = 'name'
  o.getName = function () {
    console.log(this.name)
  }
  return o
}
// var readFile = 1
const person = createPerson()
console.log(Object.getPrototypeOf(person))
