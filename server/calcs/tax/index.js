'use strict';

var express = require('express');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var controller = require('./calcs.tax.controller');

var util = require('util');
var router = express.Router();
router.get('/', controller.projection);

module.exports = router;
