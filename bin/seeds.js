const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://localhost/myBerlinMap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    username: 'juliana',
    password: 'pw',
  }

];
User.insertMany(users)
  .then(result => {
    console.log('Seed successfull');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`An error occured: ${err}`);
  });