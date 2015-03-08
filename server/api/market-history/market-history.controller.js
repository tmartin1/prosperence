'use strict';

var MarketHistory = require('./market-history.model');
var config = require('../../config/environment');
var Promise = require('bluebird');
var request = require('request-promise');
// TODO: make api request dynamic to current date.
var currentDate = new Date();
var api = "http://globalindiceshistorical.xignite.com/xglobalindiceshistorical.json/GetHistoricalIndexValues?Identifier=SPX.INDCBSX&IdentifierType=Symbol&StartDate=4/1/1950&EndDate=3/1/2015&_Token=E208B2F5497C4880B593EBFC90856142";

// Populate monthly returns
// TODO: Refactor so it doesn't rebuild entire array every month but just adds new month.
var getMonthlyReturns = function(req, res) {
  return new Promise (function(resolve, reject) {
    if (!lastQueryMonth || lastQueryMonth.getFullMonth !== new Date.getFullMonth()) {
      var options = {
        "url": api,
        "json": true
      };
      // Send request to Xignite to retreive market data.
      request(options, function(error, message, res) {
        if(!error) {
          // build data array of historic performance.
          var data = [];
          var temp =0;
          var month = res.Values[0].Date.split('/')[0];
          for (var i=0; i<res.Values.length; i++) {
            // Generate total change over the current month.
            if (res.Values[i].Date.split('/')[0] === month) {
              temp += res.Values[i].ChangeFromPreviousClose;
            }
            // When month changes, push temp to data and reset temp to zero.
            else {
              data.push(temp);
              temp = 0;
              var month = res.Values[i].Date.split('/')[0];
            }
          }
        } else {
          console.log(error);
        }
      }).then(
        function(rsp) {
          MarketHistory.monthlyReturns = rsp.Values;
          resolve(MarketHistory.monthlyReturns);
        }
      ).catch(
        function(err) {
          console.log("request failed ----- ", err)
        }
      );
    } else {
      resolve(MarketHistory.monthlyReturns);
    }
  });
};

var lastQueryMonth;
// Get array of monthly market performance from 1950 to today.

exports.index = function(req, res) {
  // If last query > 1 month ago, re-query

  getMonthlyReturns(req, res)
    .then(function(rsp) {
      res.json(200, rsp);
    });
};
//
// // Get a single product
// exports.show = function(req, res) {
//   Product.findById(req.params.id, function (err, product) {
//     if(err) { return handleError(res, err); }
//     if(!product) { return res.send(404); }
//     return res.json(product);
//   });
// };
//
// // Creates a new product in the DB.
// exports.create = function(req, res) {
//   Product.create(req.body, function(err, product) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, product);
//   });
// };
//
// // Deletes a product from the DB.
// exports.destroy = function(req, res) {
//   Product.findById(req.params.id, function (err, product) {
//     if(err) { return handleError(res, err); }
//     if(!product) { return res.send(404); }
//     product.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}
