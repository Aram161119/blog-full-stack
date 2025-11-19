const mongoose = require('mongoose');
const validator = require('validator');

const PostScheme = mongoose.Schema({
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Image must be a URL',
        }
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
}, {timestamps: true});

const Post = mongoose.model('Post', PostScheme);

module.exports = Post;