'use strict';

angular.module('prosperenceApp')
.controller('SetGoalsCtrl', function ($scope) {
  $scope.queries = [{
    title: 'Retirement Goals',
    type: 'multi',
    subqueries: [
      {
        question: 'At what age would you like to retire?',
        type: 'number',
        bind: 'targetRetirementAge'
      }, {
        question: 'How much money would you expect to need each month during retirement (in today\'s dollars, results will be adjusted for inflation)?',
        type: 'number',
        bind: 'targetRetirementIncome'
      }, {
        question: 'If you have a pention, enter the monthly income it will provide below:',
        type: 'number',
        bind: 'pensionIncome'
      }
    ]
  }];
});
