const express = require('express');
const router = express.Router();
//const userController = require('../controllers/user.controller');

router.post('/signup', function (req, res, next) {
    res.send('hello world');
});

router.post('/login', function (req, res, next) {
    res.send('hello world');
});

module.exports = router;