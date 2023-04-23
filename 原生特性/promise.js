var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  })
})

var result = p.then(2)

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('result: ', 
    result.then((data)=>{console.log('data: ', data)})
          .then((data)=> {console.log('data: ', data)})
    
    )
  })
}, 3000)