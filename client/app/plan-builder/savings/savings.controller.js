'use strict';

angular.module('prosperenceApp')
.controller('SavingsCtrl', function ($scope) {

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  // Array of question objects to be asked in the 'Savings' section.
  $scope.queries = [{
    title: 'Non-Retirement Savings', // Emergency reserves, 'new home fund', etc.
    type: 'table',
    bind: 'contributions',
    question: 'Please enter your non-retirement account contributions.',
    fields: [{
      label: 'Account Name', // These should be the same as their ER or non-retirement variable asset account names.
      value: 'name',
      type: 'text'
    }, {
      label: 'Contribution',
      value: 'contribution',
      type: 'number'
    }, {
      label: 'Frequency',
      value: 'frequency',
      type: 'select',
      options: ['Weekly', 'Monthly', 'Semi-Annually', 'Anunally']
    }]
  }, {
    title: 'Retirement Savings',
    type: 'table',
    bind: 'contributions',
    question: 'Please enter your retirement account contributions.',
    fields: [{
      label: 'Account Name', // These should be the same as their retirement account names from variable assets.
      value: 'name',
      type: 'text'
    }, {
      label: 'Contribution',
      value: 'contribution',
      type: 'number'
    }, {
      label: 'Frequency',
      value: 'frequency',
      type: 'select',
      options: ['Weekly', 'Monthly', 'Semi-Annually', 'Anunally']
    }]
  }];
  $scope.setQueries($scope.queries);

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
