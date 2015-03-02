'use strict';

angular.module('prosperenceApp')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/plan-builder', '/plan-builder/start');

  $stateProvider
  .state('plan-builder', {
    url: '/plan-builder',
    templateUrl: 'app/plan-builder/plan-builder.html',
    controller: 'PlanBuilderCtrl',
    abstract: true
  })
  .state('plan-builder.start', {
    url: '/start',
    templateUrl: 'app/plan-builder/start/start.html',
    controller: 'PlanBuilderCtrl',
    data: {
      title: 'Plan Builder'
    }
  })
  .state('plan-builder.basics', {
    url: '/basics',
    templateUrl: 'app/plan-builder/basics/basics.html',
    controller: 'BasicsCtrl',
    data: {
      title: 'Personal Info'
    }
  })
  .state('plan-builder.assets-debts', {
    url: '/assets-debts',
    templateUrl: 'app/plan-builder/assets-debts/assets-debts.html',
    controller: 'AssetsDebtsCtrl',
    data: {
      title: 'Net Worth'
    }
  })
  .state('plan-builder.cash-flow', {
    url: '/cash-flow',
    templateUrl: 'app/plan-builder/cash-flow/cash-flow.html',
    controller: 'CashFlowCtrl',
    data: {
      title: 'Cash Flow'
    }
  })
  .state('plan-builder.insurances', {
    url: '/insurances',
    templateUrl: 'app/plan-builder/insurances/insurances.html',
    controller: 'InsurancesCtrl',
    data: {
      title: 'Insurances'
    }
  })
  .state('plan-builder.tax', {
    url: '/tax',
    templateUrl: 'app/plan-builder/tax/tax.html',
    controller: 'TaxProjectionCtrl',
    data: {
      title: 'Tax Questions'
    }
  })
  .state('plan-builder.goals', {
    url: '/goals',
    templateUrl: 'app/plan-builder/goals/goals.html',
    controller: 'SetGoalsCtrl',
    data: {
      title: 'Goals'
    }
  });
});
