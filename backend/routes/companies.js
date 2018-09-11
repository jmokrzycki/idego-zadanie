const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../helpers/dbSetup');
const Company = require('../models/companies');

router.get('/', function(req, res, next) {
  Company.findAll().then(companies => res.json(companies));
});

router.post('/', function (req, res) {
  const newCompany = req.body;
  Company.create(newCompany)
  .then((newCompany) => res.status(200).json(newCompany));
})

module.exports = router;
