// Import the Post model
const Post = require('../models/post');
const User = require('../models/user');
// import Op from sequelize
const Op = require('sequelize').Op;

// Create new CRUD endpoint for create post
exports.createPost = (req, res, next) => {
    // Get data from request body
    const title = req.body.title;
    const content = req.body.content;
    // Get user id from JWT token (Authorization: Bearer <token>)
    const userId = req.userId;

    // Create new post
    Post.create({
        title: title,
        content: content,
        userId: userId
    }).then(result => {
        res.status(201).json({
            message: 'Post created successfully',
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Get all post
exports.getAllPost = (req, res, next) => {
    // Get all post
    Post.findAll({
        include: {
            model: User,
            attributes: ['id', 'fullname', 'email']
        }
    }).then(result => {
        res.status(200).json({
            message: 'Get all post successfully',
            posts: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Get all post by user id
exports.getAllPostByUserId = (req, res, next) => {
    // Get user id from request params
    const userId = req.params.userId;

    // Get all post by user id
    Post.findAll({
        where: {
            userId: userId
        },
        include: {
            model: User,
            attributes: ['id', 'fullname', 'email']
        }
    }).then(result => {
        res.status(200).json({
            message: 'Get all post by user id successfully',
            posts: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Get post from user logged using JWT token
exports.getPostByUserLogged = (req, res, next) => {
    // Get user for request
    const userId = req.userId;

    // Get all post by user id
    Post.findAll({
        where: {
            userId: userId
        },
        include: {
            model: User,
            attributes: ['id', 'fullname', 'email']
        }
    }).then(result => {
        res.status(200).json({
            message: 'Get all post by user id successfully',
            posts: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Lookup post by id
exports.getPostById = (req, res, next) => {
    // Get post id from request params
    const postId = req.params.postId;

    // Find post by id
    Post.findByPk(postId, {
        include: {
            model: User,
            attributes: ['id', 'fullname', 'email']
        }
    }).then(result => {
        if (!result) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Get post by id successfully',
            post: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Lookup post by criteria in title
exports.searchPostByTitle = (req, res, next) => {
    // Get criteria from request query
    const criteria = req.query.criteria;

    // Find post by criteria in title
    Post.findAll({
        where: {
            title: {
                [Op.like]: `%${criteria}%`
            }
        },
        include: {
            model: User,
            attributes: ['id', 'fullname', 'email']
        }
    }).then(result => {
        res.status(200).json({
            message: 'Get post by criteria in title successfully',
            post: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Update post by id
exports.updatePostById = (req, res, next) => {
    // Get post id from request params
    const postId = req.params.postId;
    const userId = req.userId;

    // Get data from request body
    const title = req.body.title;
    const content = req.body.content;

    // Update post
    Post.findOne({
        where: {
            id: postId,
            userId: userId
        }
    }).then(post => {
        if (!post) {
            const error = new Error('You cannot update this post');
            error.statusCode = 404;
            throw error;
        }

        post.title = title;
        post.content = content;
        return post.save();
    }).then(result => {
        res.status(200).json({
            message: 'Update post successfully',
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Delete post by id

exports.deletePostById = (req, res, next) => {
    // Get post id from request params
    const postId = req.params.postId;
    const userId = req.userId;

    // Delete post
    Post.findOne({
        where: {
            id: postId,
            userId: userId
        }
    }).then(post => {
        if (!post) {
            const error = new Error('You cannot delete this post');
            error.statusCode = 404;
            throw error;
        }

        return post.destroy();
    }).then(result => {
        res.status(200).json({
            message: 'Delete post successfully',
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}