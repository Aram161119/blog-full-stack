const mapComment = require('./mapComment');
const mongoose = require("mongoose");

module.exports = function (post) {
    return {
        id: post._id,
        imageUrl: post.image,
        title: post.title,
        content: post.content,
        comments: post.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment.toJSON() : mapComment(comment)),
        publishedAt: post.createdAt,
    }
}