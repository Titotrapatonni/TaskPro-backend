const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PROJECT_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${PROJECT_URL}/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (req, accessToken, callback, refreshToken, profile, done) => {
  try {
    const { email, displayName, photos } = profile;
    const avatarUrl = photos && photos.length > 0 ? photos[0].value : '';
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({ email, password, name: displayName, avatarURL: avatarUrl });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
