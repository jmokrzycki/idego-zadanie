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
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    where: {
      username: username,
    }
}
).then(user => {
  const passwordMatch = passwordHash.verify(password, user.password);
  if(user && passwordMatch){
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
