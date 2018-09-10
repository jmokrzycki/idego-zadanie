var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const passwordHash = require('password-hash');

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


router.post('/', function(req, res, next) {
  const newUser = req.body;
  console.log(newUser);
  newUser.password = passwordHash.generate(newUser.password);
  console.log(newUser);
  User.create(newUser)
  .then((newUser) => res.status(200).json(newUser));
});

module.exports = router;
