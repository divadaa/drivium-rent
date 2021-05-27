require('dotenv').config();
require('../configs/db');

const { createUsers } = require('./users');
const { createCars } = require('./cars');
const { createBookings } = require('./bookings');
// const { createBusinessInvestors } = require('./businessinvestors');
// const { createParticularInvestors } = require('./particularinvestors');

(async () => {
  try {
    await createUsers();
    await createCars();
    // await createBusinessInvestors();
    // await createParticularInvestors();
    await createBookings();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
