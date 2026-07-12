const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
  CategoryID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Categories',
  timestamps: false
});

module.exports = Category;
