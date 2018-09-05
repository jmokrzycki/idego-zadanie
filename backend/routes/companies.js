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
const Company = sequelize.define('company', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  nip: Sequelize.STRING,
  regon: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
});

//Company.findAll().then(aa => console.log(aa));

//==
/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
Company.findAll().then(aa => res.json(aa));
});

router.post('/', function (req, res) {
  const newCompany = req.body;
  console.log(req.body);
  sequelize.sync()
    .then(() => Company.create(newCompany))
    .success(console.log('ok'));

  res.send('POST request to the homepage')
})
/*

*/
module.exports = router;
