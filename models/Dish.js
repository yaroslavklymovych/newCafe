const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Dish = sequelize.define('Dish', {
  DishID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },

  Name: { type: DataTypes.STRING, allowNull: false },
  Taste: { type: DataTypes.STRING, allowNull: false },
  Price: { type: DataTypes.DECIMAL, allowNull: false },
  Weight: { type: DataTypes.STRING, allowNull: false },
  Description: { type: DataTypes.STRING, allowNull: true },

  CategoryID: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: { model: 'Categories', key: 'CategoryID' },
    onDelete: 'NO ACTION', 
    onUpdate: 'CASCADE'
  },

  SubCategoryID: {
    type: DataTypes.CHAR(36),
    allowNull: true,
    references: { model: 'SubCategories', key: 'SubCategoryID' },
    onDelete: 'SET NULL',  
    onUpdate: 'CASCADE'
  },

  ImageUrl: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'Dishes',
  timestamps: false
});

module.exports = Dish;
