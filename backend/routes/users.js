const express = require('express');
const router = express.Router();
const sequelize = require('../helpers/dbSetup');
const User = require('../models/users');

router.get('/', function(req, res, next) {
  User.findAll()
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
});

module.exports = router;
