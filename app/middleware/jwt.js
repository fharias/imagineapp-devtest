// Middleware for validating JWT tokens
const jwt = require('jsonwebtoken');

// Create new middleware for validating JWT tokens
module.exports = (req, res, next) => {
    // Get authorization header from request headers
    const authHeader = req.get('Authorization');

    // Check if authorization header is exist
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    // Get token from authorization header
    const token = authHeader.split(' ')[1];

    // Create variable for decoded token
    let decodedToken;

    try {
        // Verify token using jsonwebtoken
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    // Check if decoded token is undefined
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    // Set userId value to request
    req.userId = decodedToken.userId;

    // Continue to next middleware
    next();
}