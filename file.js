// requiring the fs
const fs = require('fs');

// this method is best when reading and writing small amount of data

// reading files
// the reafile takes in two arguments, the path and the function which takes in two arguments, the error and data
// the radfile is an async cunction
// if you try to read a file that does not exist you'll get an error
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data.toString())
// })


// writing files
// the writefile takes in three arguments, the path, the thing to be changed, and the function
// the writefile is an async function
// if you try writing a file that doesn't exist, a new file will be created
// fs.writeFile('./docs/blog1.txt', 'rada morio', () => {
//     console.log('file was written')
// })

// fs.writeFile('./docs/blog2.txt', 'hey hey hey', ()=>{
//     console.log('a new file has been created')
// })


// working with directories
// first check if the directory does not exist. If it does not create a new one. if it exists delete it
// fs.existsSync -> is a synchronous function. It takes in the path of the file or directory and checks if it exists or not
// fs.mkdir -> this creates a new directory. It takes in two parameters, the name of the directory and where we want it created, and a callback function since it's an async function. We have specified that we want a new directory called assets in this same directory.
// fs.rmdir -> This deletes a directory. It takes in two parameters, the path and the name of the directory, and a callback function since it's an async function. we have specified that the file to be deleted is in this directory sand it is called assets

if (!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=> {
        if (err){
            console.log(err)
        }
        console.log('assets directory created')
    })
} else {
    fs.rmdir('./assets', (err)=>{
        if (err){
            console.log(err)
        }
        console.log('assets directory deleted')
    })
}

// deleting files
// we must first ensure that the file exists
// we use the unlink function to delete a file. It takes in two arguments, the path and a callback function since unlink() is an async function.
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if(err){
            console.log(err)
        }
        console.log('file deleted')
    })
}