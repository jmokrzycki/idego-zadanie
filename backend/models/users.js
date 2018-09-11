const Sequelize = require('sequelize');
const sequelize = require('../helpers/dbSetup');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
});

sequelize.sync();

module.exports = User;
