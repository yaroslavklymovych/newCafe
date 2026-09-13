const express = require('express');
const path = require('path');
const listEndpoints = require('express-list-endpoints');
const { sequelize } = require('./models');


const form = require('./controllers/form.controller'); 
// Route Imports
const category = require('./routes/category.routes');
const subcategory = require('./routes/subcategory');
const user = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const cafeRoutes = require('./routes/cafe.routes');
const ingridientRoutes = require('./routes/ingridient.routes');
const menuRoutes = require('./routes/menu.routes');
const employeeRoutes = require('./routes/employee.routes');
const dishRoutes = require('./routes/dish.routes'); // Fixed path syntax

// Controller / Middleware Imports
// Note: Ensure form.controller is used in a route rather than passed directly to app.use()


const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(form);
app.use(category);
app.use(subcategory);
app.use(dishRoutes);
app.use('/api/user', user);
app.use('/api/users', userRoutes); // Removed duplicate app.use(userRoutes)
app.use(cafeRoutes);
app.use(ingridientRoutes);
app.use(menuRoutes);
app.use(employeeRoutes);


// Example: Map form controller to a specific endpoint instead of app.use(form)
// app.post('/api/form', form.submitForm);

// Database Connection & Sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Ok");
    await sequelize.sync({ force: false });
    console.log("DB synced!");
  } catch (e) {
    console.error('DB error: ', e);
  }
})();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(listEndpoints(app));
});

module.exports = app;