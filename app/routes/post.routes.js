// Routes for POST requests

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// endpoint for create post
router.post('/create', postController.createPost);

// endpoint for get all post
router.get('/all', postController.getAllPost);

// endpoint for get all post by user logged
router.get('/myposts', postController.getPostByUserLogged);

// endpoint for get all post by user id
router.get('/user/:userId', postController.getAllPostByUserId);
// endpoint lookup by title
router.get('/search/', postController.searchPostByTitle);
// endpoint for get post by id
router.get('/:postId', postController.getPostById);

// endpoint for update post by id
router.put('/:postId', postController.updatePostById);

// endpoint for delete post by id
router.delete('/:postId', postController.deletePostById);




module.exports = router;