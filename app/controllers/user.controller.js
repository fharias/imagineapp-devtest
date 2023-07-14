// Import bcrypt
const bcrypt = require('bcrypt');
// import jsonwebtoken
const jwt = require('jsonwebtoken');
// Import the User model
const User = require('../models/user');

// CReate new CRUD endpoint for user
exports.createUser = (req, res, next) => {
    // Get data from request body
    const fullname = req.body.fullname;
    const email = req.body.email;
    // Hash password
    const password = bcrypt.hashSync(req.body.password, 8);

    // Create new user
    User.create({
        fullname: fullname,
        email: email,
        password: password
    }).then(result => {
        res.status(201).json({
            message: 'User created successfully',
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Create new CRUD endpoint for get all user
exports.getAllUser = (req, res, next) => {
    // Get all user
    User.findAll({
        attributes: ['id', 'fullname', 'email', 'createdAt', 'updatedAt']
    }).then(result => {
        res.status(200).json({
            message: 'Get all user successfully',
            user: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Update user endpoint
exports.updateUser = (req, res, next) => {
    // Get user id from request
    const userId = req.userId;
    // Get data from request body
    const fullname = req.body.fullname;
    const email = req.body.email;

    // Find user by id
    User.findByPk(userId).then(user => {
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Update user data
        user.fullname = fullname;
        user.email = email;

        // Save user data
        return user.save();
    }).then(result => {
        res.status(200).json({
            message: 'Update user successfully',
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Create new CRUD endpoint for get user by id
exports.getUserById = (req, res, next) => {
    // Get user id from request params
    const userId = req.params.userId;

    // Find user by id
    User.findByPk(userId, {
        attributes: ['id', 'fullname', 'email']
    }).then(result => {
        if (!result) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Get user by id successfully',
            user: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Lookup user by email address
exports.login = (req, res, next) => {
    // Get email from request params
    const email = req.body.email;
    // Hash password
    const password = req.body.password;

    // Find user by email
    User.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (!result) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        // compare password 
        if (!bcrypt.compareSync(password, result.password)) {
            const error = new Error('Password not match');
            error.statusCode = 404;
            throw error;
        }
        // Create new JWT token
        const token = jwt.sign({
            email: result.email,
            userId: result.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'Logged successfully',
            token
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Get user profile endpoint
exports.getUserProfile = (req, res, next) => {
    // Get user id from request
    const userId = req.userId;
    console.log(`User id: ${userId}`);
    // Find user by id
    User.findByPk(userId, {
        attributes: ['id', 'fullname', 'email']
    }).then(result => {
        if (!result) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Get user profile successfully',
            user: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}