'use strict';

var express = require('express');
var controller = require('./search.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var util = require('util');

var router = express.Router();
router.post('/suggest', controller.suggest);
router.post('/', controller.search);

module.exports = router;
