const express = require('express');
const path = require('path');
const app = express();
const { sequelize } = require('./models');
const dish = require('./routes/dish');
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');
const form = require('./controllers/form.controller');
const dishValidate = require('./middleware/dishValidate');
const user = require('./routes/auth.routes');
const listEndpoints = require('express-list-endpoints');
const userRoutes = require('./routes/user.routes');
const cafeRoutes = require('./routes/cafe.routes');
const ingridientRoutes = require('./routes/ingridient.routes');
const menuRoutes = require('./routes/menu.routes');
const Employee = require('./models/Employee');
const employeeRoutes = require('./routes/employee.routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dishRouter = require('./routes/dish.router');

// app.use('/dishes', dish.router);
// app.use(dishValidate.validateDish);
// app.use(dishValidate.validateUpdateDish);

app.use(category);
app.use(subcategory);
app.use(form);
app.use('/api/dish', dishRouter);
app.use('/api/user', user);
app.use('/api/users', userRoutes);
app.use(userRoutes);
app.use(cafeRoutes);
app.use(ingridientRoutes);
app.use(menuRoutes);
app.use(employeeRoutes);
(async () => {
  try {
    await sequelize.authenticate();
    await Employee.sync({ force: false });
    console.log("Connection Ok");
    console.log("DB synced!");

  } catch (e) {
    console.error('DB error: ', e);
  }
})();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



console.log(listEndpoints(app));


module.exports = app;
