const UserModel = require('../models/UserModel');
const hashPassword = require('../utils/hashPassword');

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
