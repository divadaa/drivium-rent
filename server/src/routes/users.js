const route = require('express').Router();
const passport = require('../configs/passport');

const { requireEmailAndPassword } = require('../middlewares/requiredFields').default;

route.post('/register', [requireEmailAndPassword], (req, res, next) => {
  try {
    passport.authenticate('register', (err, user) => {
      if (err) {
        return res.status(402).json({ data: err.message });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(401).json({ data: loginErr.message });
        }

        res.status(200).json({ data: user });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err.message });
  }
});

route.post('/login', [requireEmailAndPassword], (req, res, next) => {
  try {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(500).json({ data: err.message });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(401).json({ data: loginErr.message });
        }

        res.status(200).json({ data: user });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err.message });
  }
});

route.post('/logout', (req, res, next) => {
  try {
    req.logOut();

    req.session.destroy();

    res.clearCookie('connect.sid', { path: '/' });

    res.status(200).json({ data: 'OK' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err.message });
  }
});

module.exports = route;
