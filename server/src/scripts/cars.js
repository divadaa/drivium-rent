require('dotenv').config();
const bcrypt = require('bcrypt');

const CarModel = require('../models/Car');
const cars = require('../seeds/Cars.json');

const createCars = async (req, res) => {
  await CarModel.deleteMany({});

  try {
    await CarModel.insertMany(cars);
    console.log('CARS CREATED!');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createCars
};
