const axios = require ('axios')

const url1 = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/'
// const url1 = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/GlobalObjects/Array/'

const promesa1 = axios.get(url1)

promesa1.then(console.log)
// const status= promesa1.then(data=> data.status)

// const statusText= promesa1.then(data=> data.statusText)
// status.then(console.log)

