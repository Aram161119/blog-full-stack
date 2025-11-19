const Post = require("../models/Post");

async function addPost(post) {
    const newPost = await Post.create(post);

    return await newPost.populate({
        path: 'comments',
        populate: 'author'
    });
}

async function updatePost(id, post) {
    const newPost = await Post.findByIdAndUpdate(id, post, {new: true});

    return newPost.populate({
        path: 'comments',
        populate: 'author'
    });
}

function getPost(id) {
    return Post.findById(id).populate({
        path: 'comments',
        populate: 'author'
    });
}

function deletePost(id) {
    return Post.deleteOne({_id: id});
}

async function getPosts(search = '', limit = 10, page = 1) {
    const [posts, count] = await Promise.all([
        Post.find({title: {$regex: search, $options: 'i'}})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt: -1}),

        Post.countDocuments({title: {$regex: search, $options: 'i'}})
    ]);

    return {
        posts,
        lastPage: Math.ceil(count / limit),
    }
}


module.exports = {
    addPost,
    updatePost,
    getPosts,
    deletePost,
    getPost
}