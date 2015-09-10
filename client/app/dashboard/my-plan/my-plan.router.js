(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.myPlan.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/net-worth');

    $stateProvider
    .state('dashboard.my-plan.net-worth', {
      url: '/net-worth',
      data: {
        planels: [
          'net-worth-chart',
          'debt-balance-over-time-chart',
          'net-worth-statement' // TODO: Make nws planel
        ]
      }
    })
    .state('dashboard.my-plan.budget', {
      url: '/budget',
      data: {
        planels: [
          'cash-flow-chart',
          'income-tax-chart',
          'cash-flow-analysis' // TODO: Make cash flow analysis planel
        ]
      }
    })
    .state('dashboard.my-plan.insurance', {
      url: '/insurance',
      data: {
        planels: [
          // TODO: Make insurance planels.
        ]
      }
    })
    .state('dashboard.my-plan.retirement', {
      url: '/retirement',
      data: {
        planels: [
          'retirement-savings-growth-chart'
        ]
      }
    })
    .state('dashboard.my-plan.more', {
      url: '/more',
      data: {
        planels: [
          // TODO: Make more planels.
        ]
      }
    });
  });

})();
