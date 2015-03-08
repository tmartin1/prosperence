'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  monthlyReturns: [Number]
});

module.exports = mongoose.model('MarketHistory', historySchema);
