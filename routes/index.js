var express = require("express");
var router = express.Router();

// root route
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;