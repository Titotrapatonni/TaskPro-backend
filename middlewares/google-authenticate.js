const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../helpers');

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
    const notHashedPassword = nanoid();
    const password = await bcrypt.hash(notHashedPassword, 10);
    const newUser = await User.create({ email, password, name: displayName, avatarURL: avatarUrl });

    const verifyEmail = {
      to: email,
      subject: `From ${PROJECT_URL}`,
      html: `
              <div>
                  <h1 style="color: red; text-align: center;">You have registered on the ${PROJECT_URL} website</h1>
                  <p style="font-size: 16px;">Your login: ${email}</p>
                  <p style="font-size: 16px;">Your password: ${notHashedPassword}</p>
                  <hr style="border-color: blue;">
                  <p style="font-style: italic;">Thank you for using our service! Site ${PROJECT_URL} administration.</p>
              </div>
          `,
    };
    await sendEmail(verifyEmail);

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
