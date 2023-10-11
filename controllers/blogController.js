const Blog = require('../models/blog')

// getting all blogs from db
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then( result => {
        res.render('blogs', { blogs: result, title: 'All Blogs'})
    })
    .catch(err => console.log(err))
}

// getting one blog from the db
const blog_details = ( req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then( result => {
        res.status(404).render('blogDetails', { blog: result, title: 'Blog Details'})
    })
    .catch( err => res.render('404', { title: 'Not Found'}));
}


// getting the create blog form
const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create Blog'})
}

// Posting blog data to the db
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch(err => console.log(err))
}


// deleting blog
const blog_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then( result => res.json({redirect: '/blogs'}))
    .catch( err => console.log(err));
}



module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}