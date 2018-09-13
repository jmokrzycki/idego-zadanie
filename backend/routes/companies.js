const express = require("express");
const router = express.Router();
const Company = require("../models/companies");

router.get("/", function(req, res, next) {
  Company.findAll().then(companies => res.json(companies));
});

router.post("/", function(req, res) {
  const company = req.body;
  Company.create(company).then(company => res.status(200).json(company));
});

module.exports = router;
