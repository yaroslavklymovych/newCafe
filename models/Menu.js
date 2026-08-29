const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Menu = sequelize.define('Menu', {
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
    },
    CafeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Menu;