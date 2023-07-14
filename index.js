// Main nodejs application file
//Use dotenv to load environment variables from a .env file into process.env
require('dotenv').config();
// Load the express module
const express = require('express');
// Load the body-parser module
const bodyParser = require('body-parser');
// Load the sequelize module
const sequelize = require('./app/util/db');
// JWT middleware
const isAuth = require('./app/middleware/jwt');
// Load the post routes
const postRoutes = require('./app/routes/post.routes');
// Load the user routes
const userRoutes = require('./app/routes/user.routes');
// Load register user routes
const registerRoutes = require('./app/routes/register.routes');

const app = express();
// Add body-parser middleware
app.use(bodyParser.json());
// Add body-parser urlencoded middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Add CORS middleware
app.use((req, res, next) => {
    // Set CORS header to response
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Set allowed method to response CORS header
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Set allowed header to response CORS header
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Continue to next middleware
    next();
});
// Set base path api
// Register user endpoint
app.use('/', registerRoutes);
// Adding Heltcheck endpoint
app.get('/health-check', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from server'
    });
});
// Add post routes to the app
app.use('/post', isAuth, postRoutes);
// Add user routes to the app
app.use('/user', isAuth, userRoutes);

// Sync all models with database
sequelize.sync().then(result => {
    console.log(`Connected to database successfully`)
        // Run the app on port 3000
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.log(err);
});