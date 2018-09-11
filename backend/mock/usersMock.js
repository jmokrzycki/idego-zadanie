const User = require('../models/users');
const passwordHash = require('password-hash');

User.findOne({
  where: {
    username: 'admin',
  }
}).then(user => {
  if (!user) {
    User.create({
      username: 'admin',
      password: passwordHash.generate('admin')
    });
  }
});
