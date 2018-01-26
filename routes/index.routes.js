const path = require('path');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(express.static('./app'));

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../app/signup.html'));
});

router.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '../app/signup.html'));
});

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../app/index.html'));
});

router.get('/layout', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/index.html'));
});



module.exports = router;
