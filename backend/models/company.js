console.log('model Company');

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
  storage: './database1.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
//==

const Company = sequelize.define('company',{
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  email: Sequelize.STRING,
  nip: Sequelize.STRING,
  regon: Sequelize.STRING,
});





//Company1.findAll().then(company => { console.log(company) });

/*
sequelize.sync()
  .then(() => Company.create ({
    name: 'Intel',
    address: 'wladyslawa 14 Warszawa 89-123',
    phone_number: '789654123',
    email: 'intel@intel.com',
    nip: '789654123',
    regon: '456456456',
  }))
  .then(() => Company.create ({
    name: 'Microsoft',
    address: 'Dluga 13 Gdansk 98-879',
    phone_number: '456987123',
    email: 'microsoft@microsoft.com',
    nip: '456231456',
    regon: '14251231',
  }))
  .then(() => Company.create ({
    name: 'Boeing',
    address: 'Szeroka 14 Szczecin 89/123',
    phone_number: '4564564',
    email: 'boeing@boeing.com',
    nip: '4545321123',
    regon: '454564564',
  }))
  .then(company => {
    console.log(company.toJSON());
  });
  */
