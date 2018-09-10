var express = require('express');
var router = express.Router();

//==
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

//==
const Company = sequelize.define('company', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  nip: Sequelize.STRING,
  regon: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
});

sequelize.sync();

router.get('/', function(req, res, next) {
  Company.findAll().then(companies => res.json(companies));
});

router.post('/', function (req, res) {
  const newCompany = req.body;
  Company.create(newCompany)
  .then((newCompany) => res.status(200).json(newCompany));
})

module.exports = router;
