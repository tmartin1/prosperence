'use strict';

var path = require('path');
var _ = require('lodash');
var local = {};
try {
  local = require('./../local.env.js');
} catch(err) {
  //do nothing
}

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'prosperence-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  cloudsearch: {
    accessKeyId: process.env.CLOUDSEARCH_AMAZON_ID || local.CLOUDSEARCH_AMAZON_ID,
    secretAccessKey: process.env.CLOUDSEARCH_AMAZON_SECRET || local.CLOUDSEARCH_AMAZON_SECRET
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
