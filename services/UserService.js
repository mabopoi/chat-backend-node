const UserModel = require('../models/UserModel');
const hashPassword = require('../utils/hashPassword');
const mongoDB = require('mongoose');
const config = require('../config');

mongoDB.connect(config.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoDB.connection.once('open', function () {
  console.log('Connected to MongoDB');
});

function getByEmail(email) {
  const foundUser = UserModel.findOne({ email: email });

  return foundUser;
}

async function post(userData) {
  const { name, email, password } = userData;
  const newUser = new UserModel({
    name,
    email,
    password: await hashPassword(password),
  });
  return newUser.save();
}

module.exports = {
  getByEmail,
  post,
};
