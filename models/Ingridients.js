const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Ingridients = sequelize.define('Ingridients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Ingridients;