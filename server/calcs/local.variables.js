// For maintaining and organizing local government variables.
// Require where needed as follows:
// var local = require('../calcs/local.variables');

'use strict';

// TODO: Add marginal state income tax data. This currently only accounts for states' top marginal income tax rate.
module.exports = {

  // Tax figures are represented in decimal form: 0.069 = 6.9%
  stateIncomeTax: {
    'AK': 0.0, // No state income tax for Alaska
    'AL': 0.05,
    'AR': 0.069,
    'AZ': 0.0454,
    'CA': 0.123,
    'CO': 0.0463,
    'CT': 0.067,
    'DC': 0.0895,
    'DE': 0.066,
    'FL': 0.0, // No state income tax for Florida
    'GA': 0.06,
    'HI': 0.11,
    'IA': 0.0898,
    'ID': 0.074,
    'IL': 0.038,
    'IN': 0.033,
    'KS': 0.046,
    'KY': 0.06,
    'LA': 0.06,
    'MA': 0.052,
    'MD': 0.0575,
    'ME': 0.0795,
    'MI': 0.0425,
    'MN': 0.0985,
    'MO': 0.06,
    'MS': 0.05,
    'MT': 0.069,
    'NC': 0.058,
    'ND': 0.0322,
    'NE': 0.0684,
    'NH': 0.0, // NH has income tax of 5% on dividend interest only
    'NJ': 0.0897,
    'NM': 0.049,
    'NV': 0.0, // No state income tax for Nevada
    'NY': 0.0882,
    'OH': 0.05333,
    'OK': 0.0525,
    'OR': 0.099,
    'PA': 0.0307,
    'RI': 0.0599,
    'SC': 0.07,
    'SD': 0.0, // No state income tax for South Dakota
    'TN': 0.0, // TN has income tax of 6% on dividend interest only
    'TX': 0.0, // No state income tax for Texas
    'UT': 0.05,
    'VA': 0.0575,
    'VT': 0.0895,
    'WA': 0.0, // No state income tax for Washington
    'WI': 0.0765,
    'WV': 0.065,
    'WY': 0.0 // No state income tax for Wyoming
  },

  // TODO: Update the statePropertyTax numbers. Current figures are from 2008.
  statePropertyTax: {
    'AK': 0.01,
    'AL': 0.0032,
    'AR': 0.0051,
    'AZ': 0.0057,
    'CA': 0.0061,
    'CO': 0.0058,
    'CT': 0.015,
    'DC': 0.0043,
    'DE': 0.0043,
    'FL': 0.0085,
    'GA': 0.0077,
    'HI': 0.0024,
    'IA': 0.0124,
    'ID': 0.0066,
    'IL': 0.0157,
    'IN': 0.0096,
    'KS': 0.0125,
    'KY': 0.007,
    'LA': 0.0014,
    'MA': 0.0096,
    'MD': 0.0077,
    'ME': 0.0105,
    'MI': 0.0145,
    'MN': 0.0094,
    'MO': 0.0087,
    'MS': 0.0047,
    'MT': 0.0081,
    'NC': 0.0075,
    'ND': 0.0141,
    'NE': 0.0172,
    'NH': 0.017,
    'NJ': 0.0174,
    'NM': 0.0051,
    'NV': 0.0063,
    'NY': 0.0114,
    'OH': 0.0129,
    'OK': 0.0072,
    'OR': 0.0081,
    'PA': 0.0134,
    'RI': 0.0124,
    'SC': 0.0049,
    'SD': 0.0124,
    'TN': 0.0067,
    'TX': 0.0176,
    'UT': 0.0056,
    'VA': 0.0069,
    'VT': 0.0153,
    'WA': 0.0084,
    'WI': 0.0171,
    'WV': 0.0048,
    'WY': 0.0054
  }
}
