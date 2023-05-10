function flat(arr, depth){

  function each(arrs, length){
    if(!Array.isArray(arrs)) return arrs 

    return arrs.map(ele => {
      if(Array.isArray(ele)){
        return each(ele, --length)
      }
      return ele
    })
  }

  return each(arr, depth)
}

const a = [1,2,3,4,[3,4,5,[6,6,7,8,[6,6,7,8]]]]

console.log(flat(a, 2))