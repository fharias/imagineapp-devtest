// Import sequelize and database connection
// Import Sequelize
const Sequelize = require('sequelize');
const sequelize = require('../util/db');
// Import User model
const User = require('./user');

// Create new table post
const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
}, {
    timestamps: true
});

Post.belongsTo(User);

module.exports = Post;