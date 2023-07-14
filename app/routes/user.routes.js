// Create routes for user
// Path: app/routes/user.routes.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// endpoint for get all user with JWT validation
router.get('/all', userController.getAllUser);
// endpoint for get user by id with JWT validation
router.get('/info/:userId', userController.getUserById);
// endpoint my info
router.get('/me', userController.getUserProfile);
// endpoint for update user by id with JWT validation
router.put('/', userController.updateUser);
module.exports = router;