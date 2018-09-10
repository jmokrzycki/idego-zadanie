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
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
});

sequelize.sync();

router.get('/', function(req, res, next) {
  User.findAll()
  //.then( users.map( user => ({username: user.username, password: })))
  .then(users => res.json(users));
});

router.patch('/', function (req, res) {
  const newCompany = req.body;
  User.update(newCompany)
  .then((newCompany) =>
  {
    res.status(200).json(newCompany)
  });
})

module.exports = router;
