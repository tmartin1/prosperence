// Income tax projection builder
'use strict';

var federal = require('../federal.variables');
var local = require('../local.variables');
var finance = require('../finance');

// Requires a plan object as a parameter
// Appends a taxProjection object to the plan and returns that same object.
module.exports.projection = function(plan) {
  // Define or reset plan.taxProjection to empty object before starting the calculations.
  plan.taxProjection = {};

  // Calculate projection results.
  var result = {};

  // The order of the following calculations must be preserved for the calculations to function properly. Edit with care.
  result.householdGross = (plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0);
  result.pretaxContributions = (plan.user401kContribution || 0) + (plan.spouse401kContribution || 0);
  result.agi = result.householdGross - result.pretaxContributions;

  // Deductions calculations
  result.deductions = {};

  // Standard deduction calcs
  result.deductions.standard = getVar(federal.deduction.standard);

  // Itemized deduction calcs
  result.deductions.itemized = {};
  // TODO: Refactor local taxes to account for living and working in different states.
  result.deductions.itemized.localTaxes = stateTax() || 0;
  result.deductions.itemized.propertyTaxes = propertyTax() || 0;
  result.deductions.itemized.mortgageInterest = mortgageInterest() || 0;
  result.deductions.itemized.miscDeduction = plan.otherDeductions || 0; // This is just a user input right now
  result.deductions.maxApplicable = maxDeduction();

  // Exemption calcs
  result.exemptions = {};
  exemptionCalc();

  result.taxableIncome = result.agi - result.deductions.maxApplicable - result.exemptions.maxApplicable;

  // Tax calcs
  result.projected = {};
  // Federal/AMT and local taxes
  result.projected.federal = federalTax();
  result.projected.amt = amtCalc();
  result.projected.local = result.deductions.itemized.localTaxes;
  // FICA tax calcs
  result.projected.fica = {};
  result.projected.fica.ss = ssCalc();
  medicareCalc();

  result.netIncome = result.netIncome - result.projected.federal - result.projected.amt - result.projected.local - result.projected.fica.ss - result.projected.fica.medicare - result.projected.fica.addlMedicare;

  plan.taxProjection = result;
  return result;

  // Helper functions for tax calculations.

  // Get variable from federal variable module.
  function getVar(target) {
    if (!target) {
      console.log('ERROR: Imporper variable request for', target, 'from federal.variables.js');
      return null;
    }
    // Check to see if requested variable depends on marital status.
    if (target[plan.filingStatus]) {
      return target[plan.filingStatus];
    } else {
      return target;
    }
  }

  // Calculate approximate property tax for primary residence.
  function propertyTax() {
    return ( plan.mortgage.homeValue * local.statePropertyTax[plan.stateResident] );
  }

  // Calculate state income tax liability.
  function stateTax() {
    var agi = result.agi || ( ((plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0)) - ((plan.user401kContribution || 0) + (plan.spouse401kContribution || 0)) );
    return ( agi * local.stateIncomeTax[plan.stateResident] );
    // TODO: Calculate state income tax marginally, rather than just by highest marginal.
  }

  // Calculate the portion of the current years' mortgage payment that is interest.
  function mortgageInterest() {
    var mortgage = plan.mortgage;
    // Create an amortization schedule. Takes four parameters: principle amount, months, interest rate (percent), start date (Date object).
    // Returns an array of payment objects { principle, interest, payment, paymentToPrincipal, paymentToInterest, date }
    var amortTable = finance.calculateAmortization(plan.mortgage.initialBalance, plan.mortgage.currentTerm*12, plan.mortgage.currentRate*100, plan.mortgage.startDate);

    // Total up how much of the payment will go to interest over the current year.
    var current = new Date(new Date().getFullYear(), 00); // Date object for current year.
    var start = (current.getFullYear() - plan.mortgage.startDate.getFullYear())*12 + (12 - plan.mortgage.startDate.getMonth());
    var end = start + 12;
    var interestPayment = 0;
    for (var i=start; i<end; i++) {
      interestPayment += amortTable[i].paymentToInterest;
    }
    return interestPayment;
  }

  // Determine the user's maximum allowable deduction (greater between standard and itemized).
  function maxDeduction() {
    var itemizedDeductions = 0;
    for (var x in result.deductions.itemized) {
      if (x !== 'miscDeduction') {
        itemizedDeductions += result.deductions.itemized[x];
      }
    }
    // Calculations for itemized deduction phaseout.
    var agiOverLimit = Math.max( 0, result.agi - getVar(federal.deduction.phaseoutStart) );
    // Pease reduction floor for misc. deductions.
    var peaseFloor = result.agi > federal.deduction.phaseoutStart ? Math.min(plan.otherDeductions, 0.02 * result.agi) : 0;
    var personalReduction = agiOverLimit * federal.deduction.itemizedReductionRate;
    var maxReduction = 0.8 * itemizedDeductions;
    var reducedItemizedDeductions = itemizedDeductions - peaseFloor - Math.min( personalReduction, maxReduction );

    return Math.max( result.deductions.standard, itemizedDeductions );
  }

  // Determine potential exemptions, reductions, and final exemption value.
  function exemptionCalc() {
    // Determine potential exemptions
    result.exemptions.claimed = getVar(federal.exemption.personal) * plan.dependents;

    // Calculate exemption reduction
    var agiOverLimit = Math.max( 0, result.agi - getVar(federal.exemption.phaseoutStart) );
    var exemptionReduction;
    if ( (result.agi - result.deductions.maxApplicable) > getVar(federal.exemption.phaseoutEnd) ) {
      exemptionReduction = 1;
    } else {
      exemptionReduction = Math.min( 1, Math.ceil(agiOverLimit/2500) * federal.exemption.phaseoutRate);
    }
    result.exemptions.reductions = result.exemptions.claimed * exemptionReduction;

    // Calculate maximum applicable exemptions.
    result.exemptions.maxApplicable = (1 - exemptionReduction) * result.exemptions.claimed;
  }

  // Calculate the federal tax liability.
  function federalTax() {
    // calculations based off of result.taxableIncome
    // federal.bracketRate = [ 0.1, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396 ];
    // federal.bracketLimit.single = [ 0, 9225, 37450,  90750, 189750, 411500, 413200 ];

    var bracketRate = getVar(federal.bracketRate);
    var bracketLimit = getVar(federal.bracketLimit);
    var income = result.taxableIncome;

    // Marginal tax calculations.
    var taxLiability = 0;
    for (var i=0; i<bracketRate.length; i++) {
      if (income >= bracketLimit[i] && i < bracketRate.length-1) {
        var temp = Math.min( bracketLimit[i+1], income ) - bracketLimit[i];
        taxLiability += (temp * bracketRate[i]);
      }
      // Catches cases where income is greater than the highest bracket.
      else if (income >= bracketLimit[i] && i === bracketRate.length-1) {
        var temp = income - bracketLimit[i];
        taxLiability += (temp * bracketRate[i]);
      }
    }
    return taxLiability;
  }

  // Calculations for Alternative Minimum Tax.
  function amtCalc() {
    var amtExemption = Math.max( 0, getVar(federal.amt.maxExemption) - ( getVar(federal.amt.exemptionReductionRate) * (result.agi - getVar(federal.amt.exemptionPhaseOut)) ) );
    var taxableIncome = result.agi - amtExemption;
    var maxAmtLiability = (federal.amt.minRate * Math.min(federal.amt.breakpoint, taxableIncome))+(federal.amt.maxRate * Math.max(0, taxableIncome - federal.amt.breakpoint));
    return Math.max(0, maxAmtLiability - result.projected.federal);
  }

  // Calculate the Social Security tax.
  function ssCalc() {
    var gross = result.householdGross || ( (plan.grossAnnualIncome || 0) + (plan.spouseGrossAnnualIncome || 0)) - ((plan.user401kContribution || 0) + (plan.spouse401kContribution || 0) );
    var taxable = Math.min( gross, federal.fica.ssWageBase );
    return ( taxable * federal.fica.ssTax );
  }

  // Calculate basic and additional medicare tax.
  function medicareCalc() {
    // Calculations for standard medicare tax.
    result.projected.fica.medicare = result.householdGross * federal.fica.medicareTax;

    // Calculationsfor additional medicare tax.
    var threshold = getVar(federal.fica.additionalMedicareLiability);
    if (result.householdGross > threshold) {
      result.projected.fica.addlMedicare = ( (result.householdGross - threshold) * federal.fica.additionalMedicareTax );
    } else {
      result.projected.fica.addlMedicare = 0;
    }
  }

};

/* This document should run all income tax projections and return an object with
   the results of all the tax calculations. The object should look like:

var taxResults = {
  householdGross: num,
  pretaxContributions: num,
  agi: num,
  deductions: {
    standard: num,
    itemized: {
      localTaxes: num,
      propertyTaxes: num,
      mortgageInterest: num,
      miscDeduction: num
    },
    maxApplicable: num
  },
  exemptions: {
    claimed: num,
    reductions: num,
    maxApplicable: num
  },
  taxableIncome: num,
  projected: {
    federal: num,
    amt: num,
    local: num,
    fica: {
      ss: num,
      medicare: num,
      addlMedicare: num
    }
  },
  netIncome: num
};

*/
