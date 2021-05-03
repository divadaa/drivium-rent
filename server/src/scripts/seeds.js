// require('../src/configs/db');
// require('dotenv').config();

// const { createUser } = require('./user');
// const { createCar } = require('./car');
// const { createBusinessInvestor } = require('./businessinvestor');
// const { createParticularInvestor } = require('./particularInvestor');

// const DEFAULT_ROWS = 5;
// const SEED = 123;

// (async () => {
//   const { USERS_ROWS, CARS_ROWS } = process.env;

//   // eslint-disable-next-line no-unused-vars
//   const [_, __, flag] = process.argv;

//   const argsOpts = {
//     randomness: SEED
//   };

//   try {
//     await createUsers(USERS_ROWS || DEFAULT_ROWS, argsOpts[flag]);
//     await createCars(CARS_ROWS || DEFAULT_ROWS, argsOpts[flag]);
//     await createFavs();
//     await createOrders();
//   } catch (error) {
//     console.error(error);
//   }
// })();