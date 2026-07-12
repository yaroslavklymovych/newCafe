const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bookmark = sequelize.define('Bookmark', {
  BookmarkID: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  FK_Dish: { type: DataTypes.UUID, allowNull: false }
}, { timestamps: false });

module.exports = Bookmark;