const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')




// mongoose and mongo sandbox routes
// getting and saving data
// saving blogs to the db
router.get('/', blogController.blog_index);


// blog post request
router.post('/', blogController.blog_create_post)

router.get('/create', blogController.blog_create_get);

// one blog
router.get('/:id', blogController.blog_details)

// blog delete request
router.delete('/:id', blogController.blog_delete)

module.exports = router;
