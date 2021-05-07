require('dotenv').config();
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');
const users = require('../seeds/Users.json');

const createUsers = async (req, res) => {
  try {
    const usersWithPassword = users.map((user) => {
      return {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
      };
    });

    await UserModel.insertMany(usersWithPassword);
    console.log('USERS CREATED!');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createUsers
};
