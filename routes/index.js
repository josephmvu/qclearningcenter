var express = require("express");
var router = express.Router();
var passport = require('passport');

// root route
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login', {
        error: req.flash('loginMessage')
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;