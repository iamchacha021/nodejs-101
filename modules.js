
// importing single items
// const xyz = require('./people')

// console.log(xyz)
// console.log(xyz.people)
// console.log(xyz.ages)


// Importing multiple items, the better way is destructuring
const {people, ages} = require('./people')

// console.log(people)
// console.log(ages)


// importing node modules
const os = require('os')

console.log(os.machine())
console.log(os.type())
console.log(os.version())



