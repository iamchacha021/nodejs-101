// require mongoose
const mongoose = require('mongoose');


// 1. The schema
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})



//2. the model
// the model takes in two arguments, the name of the model; Capital letter and singular of the collection name in atlas, the schema we want to base out model on
const Blog = mongoose.model('Blog', blogSchema);


// 3. export the model
module.exports = Blog