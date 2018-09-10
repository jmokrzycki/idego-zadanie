var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

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
  // And insert something like this instead:
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    where: {
      username: username,
      password: password,
    }
}
).then(user => {
  if(user){
    let token = jwt.sign({ id: user.id, username: username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
    res.json({
        sucess: true,
        err: null,
        token
    });
} else {
  res.status(401).json({
      sucess: false,
      token: null,
      err: 'Username or password is incorrect'
  });
} } )});

module.exports = router;
