const sequelize = require('../db');

const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Dish = require('./Dish');
const Bookmark = require('./Bookmarks');
const Employee = require('./Employee');
const Form = require('./Form');
const User = require('./User');
const Cafe = require('./Cafe');
const Ingridients = require('./Ingridients');
const Menu = require('./Menu');
// Category to Subcategory
console.log(Category);

Category.hasMany(SubCategory, { foreignKey: 'FK_Category' });
SubCategory.belongsTo(Category, { foreignKey: 'FK_Category' });
//Category to dish

//Subcategory to Dish
SubCategory.hasMany(Dish, { foreignKey: 'SubCategory_id' });
Dish.belongsTo(SubCategory, { foreignKey: 'SubCategory_id' });

// Dish to Bookmarks
Dish.hasMany(Bookmark, { foreignKey: 'FK_Dish' });
Bookmark.belongsTo(Dish, { foreignKey: 'FK_Dish' });


Category.hasMany(Dish, { foreignKey: 'FK_Category'});
Dish.belongsTo(Category, { foreignKey: 'FK_Category'});

Cafe.hasMany(Menu, { foreignKey: 'CafeId' });
Menu.belongsTo(Cafe, { foreignKey: 'CafeId' });

User.hasMany(Cafe, {foreignKey: 'UserId'});
Cafe.belongsTo(User, {foreignKey: 'UserId'});

Dish.hasMany(Ingridients, { foreignKey: 'DishId' });
Ingridients.belongsTo(Dish, { foreignKey: 'DishId' });

Menu.hasMany(Dish, { foreignKey: 'MenuId' });
Dish.belongsTo(Menu, { foreignKey: 'MenuId' });

module.exports = {
  sequelize,
  Category,
  SubCategory,
  Dish,
  Bookmark,
  Employee,
  Form,
  User,
  Cafe,
  Ingridients,
  Menu
};
