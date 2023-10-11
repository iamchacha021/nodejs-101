// we must first require th htpp module

const fs = require('fs')
const http = require('http')
const _ = require('lodash')

// next we must create the server
// the createserver takes in a callback function. The callback function takes in two arguments, the rquest and the response. The request has lots of information such as the url, the request type etc

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method)

    const num = _.random(7,43)
    console.log(num)

    // routes
    let path = './views/';

    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        
        // redirecting the user from /about-me to /about
        case '/about-us':
            res.statusCode = 301  /* we don't need a path */
            res.setHeader('Location', '/about') /* We need to set a location or rather a destination for the redirect */
            res.end() /* and most importantly, we need to end the request */
            break;
        default:
            path += '404.html'
            res.statusCode = 404
            break;
    }
    
    // response object
    // the response object has three steps
    // 1. Setting the header, there are different types of headers
    // 2. Writing the response
    // 3. Ending the response

    // res.setHeader('Content-Type', 'text/plain') /*plain text*/
    // res.write('Hello ninjas')
    // res.end()

    // res.setHeader('Content-Type', 'text/html') /*html instead of plain text */
    // res.write('<h1>Hello Ninjas</h1>')
    // res.write('<p>It is me yah boy boy</p>')
    // res.end()
    // but sending html that way is time consuming so we will need a better way of sending html documents


    // better way
    res.setHeader('Content-Type', 'text/html')
    // we will need to read documents and to do that we will need to require the node fs module
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err)
            res.end()
        } else {
            // if we are writing multiple things we can do this below
            // res.write(data)
            // res.end()

            // if we are writing one thing we can do this
            res.end(data)
        }
    })
    // the fs.readfile takes in the path and a callback function.
    // The callback function takes in two arguments, the error and the data.
    // If there is an error, console log the error and be sure to end the response so as not to leave it hanging
    // If there is no error res.write(data) write the data and end the response
})

// we have to make the server actively listen to requests, we will do this by invoking the listen method
// .listen() -> takes in three arguments, the port number, the host name, and a callback function that fires once we start listening

server.listen(3000, 'localhost', ()=>{
    console.log('listening for request on port 3000')
})

// next you need to run this file via node and tada!! the server has been created