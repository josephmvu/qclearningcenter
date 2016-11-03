var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Models = require('../models');

// serialize sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Models.User.findOne({
        where: { id: id }
    }).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, null);
    });
});

// local login strategy
passport.use(new LocalStrategy({
    usernameField: 'email', // use email instead of username
    passReqToCallback: true
}, (req, email, password, done) => {
    Models.User.findOne({
        where: { email: email }
    }).then((user) => {
        // if user does not exist - return
        if (!user) {
            return done(null, false, req.flash('loginMessage', 'That email is not registered'));
        }
        
        // user exists - check if password is valid
        if (user.password === password) {
            return done(null, user);
        }
        
        // password was incorrect
        done(null, false, req.flash('loginMessage', 'Incorrect password.'));
    }).catch((err) => {
        done(err, false, req.flash('loginMessage', 'There was an unexpected error.'));
    });
}));

