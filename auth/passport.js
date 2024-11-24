require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require("../models/users.model");
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'https://mysterious-artifacts.vercel.app/auth/google/callback'
}, (token, tokenSecret, profile, done) => {

    const newUser = {
        userId: profile.id,
        userName: profile.displayName,
        userEmail: profile.emails[0].value,
        userImg: profile.photos[0].value,
        userType: "shopper"
    }
    const user = userModel.getUserById(profile.id);
    if (!user) {
        userModel.createNewUser(Object.values(newUser));
    }
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});