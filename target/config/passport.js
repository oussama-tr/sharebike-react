const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./../models/user.model');
const LocalStrategy = require("passport-local").Strategy;
var GoogleTokenStrategy = require('passport-google-id-token');
const FacebookTokenStrategy = require('passport-facebook-token');


const key = process.env.TOKEN_KEY;

const googleClientID = process.env.GOOGLECLIENTID;
const googleClientSecret = process.env.GOOGLECLIENTSECRET;

const facebookClientID = process.env.FACEBOOKCLIENTID;
const facebookClientSecret =  process.env.FACEBOOKCLIENTSECRET;


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {


  passport.use(
    new JwtStrategy(opts, (jwtPyload, done) => {
      User.findById(jwtPyload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

    passport.use(new GoogleTokenStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret
    }, async (parsedToken, googleId, done) => {
        try {
            // check whether this current user exists in our DB
            const existingUser = await User.findOne({ "google.id": googleId });
            if(existingUser)
                return done(null, existingUser);
            else
            {
                done(null, false, 'unauthorized : no such account for given id token');
            }
        } catch(error) {
            done(error, false, error.message);
        }
    }));
    passport.use('facebookToken', new FacebookTokenStrategy({
        clientID: facebookClientID,
        clientSecret: facebookClientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // check whether this current user exists in our DB
            const existingUser = await User.findOne({ "facebook.id": profile.id });
            if(existingUser) {
                return done(null, existingUser);
            }
            else
            {
                done(null, false, 'unauthorized : no such account for given access token');
            }
        } catch(error) {
            done(error, false, error.message);
        }
    }));

    passport.use(
        new LocalStrategy(
            {
                usernameField: "number"
            },
            async (number, password, done) => {
                try {
                    // Find the user given the phone number
                    const user = await User.findOne({ "local.number": number });
                    // If not, handle it
                    if (!user) {
                        return done(null, false);
                    }
                    // Check if the password is correct
                    const isMatch = await user.isValidPassword(password);
                    // If not, handle it
                    if (!isMatch) {
                        return done(null, false);
                    }
                    // Otherwise, return the user
                    done(null, user);
                } catch (error) {
                    done(error, false);
                }
            }
        )
    );


};
