require('dotenv').config();
const bcrypt = require('bcrypt');

const BookingsModel = require('../models/Booking');
const booking = require('../seeds/Bookings.json');

const createBookings = async (req, res) => {
  try {
    await BookingsModel.insertMany(booking);
    console.log('BUSINESS INVESTOR CREATED!');
  } catch (err) {
    console.error(err.message);
  }
};

const dropBookings = async () => {
    await BookingsModel.deleteMany({});
  
    console.info('> Bookings collection deleted!');
  };

module.exports = {
  createBookings,
  dropBookings
};
