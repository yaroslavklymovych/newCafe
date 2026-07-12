const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
  EmployeeID: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  Name: { type: DataTypes.STRING, allowNull: false },
  LastName: { type: DataTypes.STRING, allowNull: false },
  Position: { type: DataTypes.STRING, allowNull: false },
  Salary: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

module.exports = Employee;
