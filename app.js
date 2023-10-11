// requiring
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); 
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config()


// setting up the express app
const app = express();

// connecting to mongodb atlas, must be below where we defined the app. Make sure after ...mongodb.net/*name-of-the-database-in-atlas*?retyrw...
const dbURI = process.env.dbURI

// connecting mongoose with the database
// mongoose.connect() is an async function that takes in a promise and therefore we can take in a .then()
mongoose.connect(dbURI)
.then((result)=> {
    console.log('connected successfully to the db')
    // This is where we should be listening for our requests. After the connection has been completed
    // listening for requests
    app.listen(3000)
})
.catch(err => console.log(err))


// register view engines
app.set('view engine', 'ejs')
// app.set('views', 'myviews') /* incase you want it to look at another folder called my views */



// middlewares
// middleware to log details of every request on the console.
// app.use((req, res, next)=>{
//     console.log('New request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// })

// app.use((req, res, next)=>{
//     console.log('in the second middleware');
//     next();
// })

// third party middlewares
// express middleware to allow static files like style sheets and image files to be accessible in the frontend. It comes by default with express
app.use(express.static('public')) /* now every file in the static folder will be accessible */
// morgan
app.use(morgan('dev'))
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true})) /* takes the inputted data from the form and transforms it to an object */


// getting all blogs from the db
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch(err => console.log(err));
})


// getting a single blog
app.get('/one-blog', (req, res) => {
    Blog.findById('651fe6f076e56460760b851d')
    .then((result) => {
        res.send(result);
    })
    .catch(err => console.log(err));
})




// responding to requests
app.get('/', (req, res)=>{
    // res.send('<p>Hello Hello Ninjas Ninjas</p>')

    // sending files
    // sendfile takes in two arguments, the path and the root. the root should be the absolute path from home/development/code ... that's why we are using the dirname
    // res.sendFile('./views/index.html', {root: __dirname});

    // this is how we render views
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title:  "Ghost", blogs})
})

// blog routes
// rendering blogs from the db to the views


app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Second Blog',
        snippet: 'My second blog',
        body: 'My very very very second blog'
    });

    blog.save()  /* async function */
    .then((result)=> {
        res.send(result);
    })
    .catch(err => console.log(err));
})

// the middleware below will not fire because we've explicitely sent a request up above
// app.use((req, res, next)=>{
//     console.log('in the third third middleware');
//     next();
// })



app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});

    res.render('about', {title: 'About Us'})
})



// redirects
app.get('about-us', (req, res) => {
    res.redirect('/about');
})

// blog routes
app.use('/blogs',blogRoutes)

// 404 page
// use() -> it is used to create middlewares, and fire middleware functions in express
// The use function doesn't take in the url like the other methods. WHy? This is because the use function fires if the rest of the codes above didn't fire
// Therefore, this function should go at the bottom
// We also have to manually setup the status code
app.use((req, res) =>{
    // res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', {title: 'erRoR'})
})