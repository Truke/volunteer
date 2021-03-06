'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/getCode', controller.getCode);
router.post('/login', controller.login);
router.get('/checklogin', controller.checkLogin);
router.get('/logout', controller.logout);

module.exports = router;