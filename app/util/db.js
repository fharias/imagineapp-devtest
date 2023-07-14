// Connect Database PostgreSQL using Sequelize
const Sequelize = require('sequelize');

// Create new Connection using pool connection

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);

module.exports = sequelize;