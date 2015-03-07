// For maintaining and organizing federal variables.
// This file should only contain the variables. Please keep all calcs and funtions in separate files.
// Require where needed as follows:
// var federal = require('../calcs/federal.variables');

'use strict';

module.exports = {

  // Retriement contribution limits.
  retirement: {
    employerMax: 18500,
    iraMax: 5500
  },

  // Standard tax bracket rates.
  bracketRate: [ 0.1, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396 ],

  // Standard tax bracket limits.
  bracketLimit: {
    // Indicies correspond to bracketRate indicies.
    single:      [ 0,  9225, 37450,  90750, 189750, 411500, 413200 ],
    married:     [ 0, 18450, 74900, 151200, 230450, 411500, 464850 ],
    headOfHouse: [ 0, 13150, 50200, 129600, 209850, 411500, 439000 ]
  },

  // Variables for deductions.
  deduction: {
    standard: {
      single: 6300,
      married: 12600,
      headOfHouse: 9250
    },
    phaseoutStart: {
      single: 258250,
      married: 309900,
      headOfHouse: 284050
    },
    itemizedReductionRate: 0.03
  },

  // Variables for exemptions.
  exemption: {
    personal: 4000,
    phaseoutStart: {
      single: 258250,
      married: 309900,
      headOfHouse: 284050
    },
    phaseoutEnd: {
      single: 380750,
      married: 432400,
      headOfHouse: 406550
    },
    phaseoutRate: 0.02,
  },

  // FICA variables and limits.
  fica: {
    ssTax: 0.062,
    ssWageBase: 118500,  // Maximum amount of earnings subject to Social Security Tax.
    medicareTax: 0.0145,
    additionalMedicareTax: 0.009,
    additionalMedicareBase: 200000, // Additional medicare withholding begins at $200k regardless of marital status.
    additionalMedicareLiability: {
      // Actual add'l medicare liability does depend on marital status.
      single: 200000,
      married: 250000,
      headOfHouse: 200000
    }
  },

  // Alternative Minimum Tax variables.
  amt: {
    maxExemption: {
      single: 53600,
      married: 83400,
      headOfHouse: 53600 // Same as single status
    },
    exemptionPhaseOut: {
      single: 199200,
      married: 158900,
      headOfHouse: 199200 // Same as single status
    },
    minRate: 0.26,
    maxRate: 0.28,
    breakpoint: 128500,
    exemptionReductionRate: 0.25
  }

}
