require('dotenv').config();
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');
const users = require('../seeds/Users.json');

const createUsers = async (req, res) => {
  try {
    await UserModel.insertMany(users);
    console.log('USERS CREATED!')
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createUsers
};
