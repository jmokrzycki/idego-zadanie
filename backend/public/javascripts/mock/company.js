
/*
sequelize.sync()
  .then(() => Company.create (
    {
    name: 'Intel',
    address: 'wladyslawa 14 Warszawa 89-123',
    phoneNumber: '789654123',
    email: 'intel@intel.com',
    nip: '789654123',
    regon: '456456456',
  }))
  .then(() => Company.create ({
    name: 'Microsoft',
    address: 'Dluga 13 Gdansk 98-879',
    phoneNumber: '456987123',
    email: 'microsoft@microsoft.com',
    nip: '456231456',
    regon: '14251231',
  }))
  .then(() => Company.create ({
    name: 'Boeing',
    address: 'Szeroka 14 Szczecin 89/123',
    phoneNumber: '4564564',
    email: 'boeing@boeing.com',
    nip: '4545321123',
    regon: '454564564',
  }))
  .then(company => {
    console.log(company.toJSON());
  });
*/
