// Import User Controller
const userController = require('../controllers/user.controller');

// Import express
const express = require('express');

// Create router
const router = express.Router();

// register new user
router.post('/register', userController.createUser);

// login user
router.post('/login', userController.login);


module.exports = router;