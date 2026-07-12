const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Form = sequelize.define('Form', {
    ID: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4},
    Name: {
        type: DataTypes.STRING,
        allowNull: false},
    Location: {
        type: DataTypes.STRING,
        allowNull: false},
    Contact: {
        type: DataTypes.STRING,
        allowNull: false},
    TypeOfService: {
        type: DataTypes.STRING,
        allowNull: false},
    POSSystem: {
        type: DataTypes.STRING,
        allowNull: false},
    AmountOfOrders: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ContactPerson: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    }


});

module.exports = Form;