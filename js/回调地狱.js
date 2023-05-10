function compose(target, callback) {
  if (target === '3') {
    return callback()
  }

  return false
}

compose(
  compose(
    compose(3, () => {
      console.log('xx')
    }
    ),
    () => { }
  ),
  () => { }
)