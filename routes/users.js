var express = require("express");
var router = express.Router();
var Models = require('../models');
var middlewares = require('../middlewares');

// use this to create an admin account - only admins can register new users
router.get('/create/admin/account', (req, res, next) => {
    Models.User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: 'password',
        isAdmin: true
    }).then((user) => {
        console.log('Admin account created');
        console.log(user.get({
            plain: true
        }));
        res.redirect('/login');
    }).catch((err) => {
        next(err);
    });
});

router.get('/dashboard', middlewares.isLoggedIn, (req, res) => {
    res.render('users/dashboard');
});

// get all users
router.get('/users', middlewares.isLoggedIn, (req, res, next) => {
    Models.User.findAll({}).then((users) => {
        res.render('users/index', {
            users: users,
            error: req.flash('error'),
            success: req.flash('success')
        });
    }).catch((err) => {
        next(err);
    });
});

// create user
router.post('/users', middlewares.isLoggedIn, (req, res, next) => {
    Models.User.create(req.body).then(() => {
        console.log('New user created');
        req.flash('success', 'Successfully created new user!');
        res.redirect('back');
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;