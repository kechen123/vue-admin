Promise.resolve('1')
  .then((res) => {
    console.log('then1' + res)
  })
  .finally(() => {
    console.log('finally1')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('w s finally2')
    return 'finally3'
  })
  .then((res) => {
    console.log('then2' + res)
  })
  .finally((res) => {
    console.log('finally3', res)
  })
  .then((res) => {
    console.log('then3', res)
  })
