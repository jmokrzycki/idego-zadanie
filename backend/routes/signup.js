const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

router.post('/', function(req, res, next) {
  const newUser = req.body;
  newUser.password = passwordHash.generate(newUser.password);
  User.create(newUser)
    .then((newUser) => res.status(200).json(newUser));
});

module.exports = router;
