require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoose = require('./configs/db');
const passport = require('./configs/passport');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: '19831985_%2021',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 2
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`> listening on port ${PORT}`);
});
