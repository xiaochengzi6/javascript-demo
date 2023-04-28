function tranvers(number){
  number = String(number)
  let result = ''
  while(number) {
    result = number.slice(-3) + (result === '' ? '' : ',') + result 
    number = number.slice(0, -3)
  }



  return result 
}

console.log(tranvers(10000000000))
