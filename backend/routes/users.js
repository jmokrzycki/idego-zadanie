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

router.delete('/', function(req, res, next) {
  User.destroy({
    where: { id: req.body.id }
  })
  .then((deletedUser) => res.status(200).json(deletedUser));
});

router.patch('/', function (req, res) {
  const user = req.body;
  User.update(
    { username: user.username, password: user.password, email: user.email },
    { where: { id: user.id }}
  )
  .then((updatedUser) => res.status(200).json(updatedUser));
})

module.exports = router;
