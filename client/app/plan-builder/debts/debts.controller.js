'use strict';

angular.module('prosperenceApp')
.controller('DebtsCtrl', function ($scope) {
  // If plan.debts does not exist, initialize it as an empty object.
  $scope.user.plan.debts = $scope.user.plan.debts || {};

  // Array of question objects to be asked in the 'Net Worth' section.
  $scope.queries = [{
    title: 'Credit Cards',
    question: "Please enter any credit cards that you don't pay off each month. If you don't have any, congratulations! Feel free to move to the next section.",
    bind: 'creditCards',
    type: 'table',
    fields: [{
      label: 'Liability Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Interest Rate',
      type: 'number',
      textAlign: 'right',
      required: true
    }, {
      label: 'Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Student Loans',
    question: "Please enter any Federal Student Loans you currently have. If you don't have any, congratulations! Feel free to move to the next section.",
    bind: 'studentLoans',
    type: 'table',
    fields: [{
      label: 'Liability Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Interest Rate',
      type: 'number',
      textAlign: 'right',
      required: true
    }, {
      label: 'Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Other Debts',
    question: "Please enter all other debt and liabilities in this section (auto loans, personal loans, HELOCs, money owed to friends/family, etc.) If you don't have any, congratulations! Feel free to move to the next section.",
    bind: 'other',
    type: 'table',
    fields: [{
      label: 'Liability Name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Interest Rate',
      type: 'number',
      textAlign: 'right',
      required: true
    }, {
      label: 'Balance',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }];

});
