const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passwordHash = require("password-hash");

router.get("/", function(req, res, next) {
  User.findAll().then(users => res.json(users));
});

router.post("/", function(req, res, next) {
  const user = req.body;
  user.password = passwordHash.generate(user.password);
  User.create(user).then(user => res.status(200).json(user));
});

router.patch("/", function(req, res) {
  const user = req.body;
  User.update(
    { username: user.username, password: user.password, email: user.email },
    { where: { id: user.id } }
  ).then(updatedUser => res.status(200).json(updatedUser));
});

router.delete("/", function(req, res, next) {
  User.destroy({
    where: { id: req.body.id }
  }).then(user => res.status(200).json(user));
});

module.exports = router;
