const Sequelize = require('sequelize');
const sequelize = require('../helpers/dbSetup');

const Company = sequelize.define('company', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  nip: Sequelize.STRING,
  regon: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
});

sequelize.sync();

module.exports = Company;
