const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'Email',
        validate: {
            isEmail: true   
        }
    },

    Password: {
        type: DataTypes.STRING,
        field: 'Password',
        allowNull: false
    }
}, {
    tableName: 'User',
    timestamps: true
});

module.exports = User;