const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Cafe = sequelize.define('Cafe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TypeOfService: {
        type: DataTypes.STRING,
        allowNull: false
    },
    POSSystem: {
        type: DataTypes.STRING,
        allowNull: false
    },
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
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }    
}, {
    tableName: 'Cafes',
    timestamps: true
});

module.exports = Cafe;