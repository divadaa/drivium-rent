const route = require('express').Router();
const passport = require('../configs/passport');

route.post('/register', (req, res, next) => {
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

route.get('/profile', (req, res, next) => {
  if (req.user) {
    return res.status(200).json({ data: req.user });
  }

  return res.status(401).json({ data: 'Not logged in' });
});

route.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

route.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.status(200).redirect(process.env.CLIENT_URL || 'http://localhost:3000');
});

route.post('/login', (req, res, next) => {
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
