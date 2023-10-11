// reading and writing large files
const fs = require('fs')

// reading streams
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'})

// writing streams
const writeStream = fs.createWriteStream('./docs/blog4.txt')
const writeStream2 = fs.createWriteStream('./docs/blog5.txt')

readStream.on('data', (chunk)=> {
    console.log('----BIG DATA STREAMING IN----')
    console.log(chunk)

    // lets pass that chunk of data to blog 4
    writeStream.write('\n ----NEW CHUNK OF DATA INCOMING---- \n')
    writeStream.write(chunk)
})

// fs.createReadstream -> can take at least one argument, the first is the path, the second is encoding, in this case we have encoded it to string
// readstream.on('data') -> it is analogical to button.addEventlistener('onClick') but instead of listening for a click event we are listening for a data. It takes in two parameters, the 'data' and a callback function to get the chunk of data
// fs.createWrite -> takes the path we want to write our file


// an easier and quicker way to pass data from a readable file to a writable file is using a pipe

readStream.pipe(writeStream2)




