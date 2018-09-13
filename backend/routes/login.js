const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");

router.post("/", function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    const passwordMatch = passwordHash.verify(password, user.password);
    if (user && passwordMatch) {
      let token = jwt.sign(
        {
          id: user.id,
          username: username
        },
        "keyboard cat 4 ever",
        {
          expiresIn: 129600
        }
      );
      res.json({
        sucess: true,
        err: null,
        token
      });
    } else {
      res.status(401).json({
        sucess: false,
        token: null,
        err: "Username or password is incorrect"
      });
    }
  });
});

module.exports = router;
