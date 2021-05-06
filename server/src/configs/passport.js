const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: LocalStrategy } = require('passport-local');
const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const User = require('../models/User');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/redirect'
//     },
//     (_accessToken, _refreshToken, profile, done) => {
//       const { id: googleId, displayName, name, emails } = profile;

//       const { value: email } = emails[0];

//       User.findOne({ email })
//         .then((user) => {
//           const salt = bcrypt.genSaltSync(12);
//           const hash = bcrypt.hashSync(uuid(), salt);

//           if (!user) {
//             const newUser = new User({
//               email,
//               googleId,
//               password: hash
//             });

//             newUser.save().then(() => {
//               done(null, newUser);
//             });
//           } else {
//             done(null, user);
//           }
//         })
//         .catch((err) => done(err, null));
//     }
//   )
// );

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
      passwordField: 'password',
      usernameField: 'email'
    },
    async (req, email, password, done) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('Este email ya está en uso');
        done(error, null);
        return;
      }

      const newUser = new User({
        email,
        name: req.body.name,
        password: bcrypt.hashSync(password, 10)
      });

      newUser
        .save()
        .then(() => {
          done(null, newUser);
        })
        .catch((err) => {
          done(err, null);
        });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      passwordField: 'password',
      usernameField: 'email'
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const error = new Error('No existen usuarios con este email y/o contraseña');
        done(error, null);
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, existingUser.get('password'));

      if (!isPasswordValid) {
        const error = new Error('Combinación email y contraseña errónea');
        done(error, null);
        return;
      }

      done(null, existingUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
