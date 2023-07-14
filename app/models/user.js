// import sequelize and database connection
// import Sequelize
const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const Post = require('./post');
// create new table user
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
}, {
    timestamps: true
});

module.exports = User;