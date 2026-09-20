const express = require('express');
const path = require('path');
const listEndpoints = require('express-list-endpoints');
const { sequelize } = require('./models');


const form = require('./controllers/form.controller');
// Route Imports
const category = require('./routes/category.routes');
const subcategory = require('./routes/subcategory');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const cafeRoutes = require('./routes/cafe.routes');
const ingridientRoutes = require('./routes/ingridient.routes');
const menuRoutes = require('./routes/menu.routes');
const employeeRoutes = require('./routes/employee.routes');
const dishRoutes = require('./routes/dish.routes');

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

// FIX: authRoutes (POST /login) and userRoutes (register, /me, /:id, ...)
// were mounted on two different prefixes — /api/user (singular) and
// /api/users (plural). Any client hitting /api/user/... for anything
// other than login got a 404, since only POST /login existed there.
// Both are now mounted under the same /api/users prefix.
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);

app.use(cafeRoutes);
app.use(ingridientRoutes);
app.use(menuRoutes);
app.use(employeeRoutes);

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