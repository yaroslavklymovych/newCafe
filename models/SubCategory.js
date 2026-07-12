const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SubCategory = sequelize.define('SubCategory', {
  SubCategoryID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  FK_Category: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: { model: 'Categories', key: 'CategoryID' },
    onDelete: 'CASCADE',   
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'SubCategories',
  timestamps: false
});

module.exports = SubCategory;
