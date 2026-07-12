const sequelize = require('./db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected');
  } catch (e) {
    console.error(' Failed:', e);
  } finally {
    await sequelize.close();
  }
})();
