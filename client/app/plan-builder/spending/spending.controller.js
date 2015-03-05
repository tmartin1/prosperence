'use strict';

angular.module('prosperenceApp')
.controller('SpendingCtrl', function ($scope) {

  // Array of question objects to be asked in the 'Cash Flow' section.
  $scope.queries = [{
    title: 'Payroll Deductions',
    type: 'multi',
    bind: 'expenses',
    subqueries: [{
      question: "Enter the total deductions from your paycheck (not including retirement contributions):",
      bind: 'userPayrollDeductions',
      type:'number'
    }, {
      question: "Enter the total deductions from your spouce's paycheck (not including retirement contributions):",
      bind: 'spousePayrollDeductions',
      type: 'number',
      condition: 'maritalStatus'
    }]
  }, {
    title: 'Fixed Expenses',
    type: 'table',
    bind: 'expenses.fixed',
    question: 'Fixed expenses are the ones that you would consider necessary to get by (mortgage payments, groceries, utilities, child care expenses, etc.).',
    fields: [{
      label: 'Fixed Expense Name',
      type: 'text'
    }, {
      label: 'Monthly Expense',
      type: 'number'
    }]
  }, {
    title: 'Flexible Expenses',
    type: 'table',
    bind: 'expenses.flexible',
    question: 'Flexible expenses are the ones that you could live without if you needed to (travel, dining out, etc.) As you may not travel every month, try to approximate by taking your annual travel expense and dividing it by twelve.',
    fields: [{
      label: 'Flexible Expense Name',
      type: 'text'
    }, {
      label: 'Monthly Expense',
      type: 'number'
    }]
  }];

});
