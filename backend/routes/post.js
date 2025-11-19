const express = require('express');

const {getPosts, getPost, updatePost, addPost, deletePost} = require("../controllers/post");
const mapPost = require("../helpers/mapPost");
const mapComment = require("../helpers/mapComment");
const {addComment, deleteComment} = require("../controllers/comment");
const ROLES = require("../constants/roles");
const hasRole = require("../middlewares/hasRole");
const auth = require("../middlewares/auth");

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
    try {
        const {search, limit, page} = req.query;

        const {posts, lastPage} = await getPosts(search, limit, page);

        res.send({
            data: {
                lastPage: lastPage,
                posts: posts?.map(post => mapPost(post))
            }, error: null
        });
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await getPost(req.params.id);

        res.send({data: mapPost(post), error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.post('/:id/comments', auth, async (req, res) => {
    try {
        const comment = await addComment(req.params.id, {
            content: req.body.content,
            author: req.user.id,
        });

        res.send({data: mapComment(comment), error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.delete('/:postId/comments/:commentId', auth,  hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        await deleteComment(req.params.commentId, req.params.postId);
        res.send({error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.patch('/:id', auth , hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const post = await updatePost(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            image: req.body.imageUrl,
        });

        res.send({data: mapPost(post), error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.post('/', auth , hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const post = await addPost({
            title: req.body.title,
            content: req.body.content,
            image: req.body.imageUrl,
        });

        res.send({data: mapPost(post)});
    } catch (error) {
        res.send({error: error || "Unknown error"});
    }
})

router.delete('/:id', auth , hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deletePost(req.params.id);

        res.send({data: null, error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

module.exports = router;

// router.post('/', hasRole([ROLES.ADMIN]), async (req, res) => {
//     try {
//         const form = new IncomingForm({uploadDir: 'uploads', keepExtensions: true});
//
//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 throw new err;
//             }
//
//             const filePath = files.imageFile.path;
//             const fileType = await fileTypeFromFile(filePath);
//
//             if (!fileType || !fileType.mime.startsWith('image/')) {
//                 throw new Error('Uploaded file is not an image');
//             }
//
//             const post = await addPost({
//                 title: fields.title,
//                 content: fields.content,
//                 image: filePath
//             })
//
//             res.send({data: mapPost(post)});
//         })
//     } catch (error) {
//         res.send({error: error || "Unknown error"});
//     }
// })
