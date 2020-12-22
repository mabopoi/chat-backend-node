const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await UserService.getByEmail(email);
      bcrypt.compare(password, user.password).then((result) => {
        if (user && result) {
          done(null, user);
        } else {
          done(null, null);
        }
      });
    }
  )
);

module.exports = passport;
