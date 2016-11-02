var express = require("express");
var router = express.Router();

// root route
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;