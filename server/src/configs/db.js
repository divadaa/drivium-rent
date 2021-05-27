const mongoose = require('mongoose');

const DB_CAR = 'mongodb://localhost:27017/drivium';
// const DB_CAR = process.env.DB_URI;

mongoose
  .connect(DB_CAR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.info('succesfully connected to mongoDB'))
  .catch((error) => {
    console.log(error);
    console.info('> error trying to connect to mongoDB', error.message);
    process.exit(0);
  });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected');
    process.exit(0);
  });
});

module.exports = mongoose;
