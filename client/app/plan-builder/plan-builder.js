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
      title: 'Getting Started'
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
  .state('plan-builder.assets', {
    url: '/assets',
    templateUrl: 'app/plan-builder/assets/assets.html',
    controller: 'AssetsCtrl',
    data: {
      title: 'Assets'
    }
  })
  .state('plan-builder.debts', {
    url: '/debts',
    templateUrl: 'app/plan-builder/debts/debts.html',
    controller: 'DebtsCtrl',
    data: {
      title: 'Debts'
    }
  })
  .state('plan-builder.spending', {
    url: '/spending',
    templateUrl: 'app/plan-builder/spending/spending.html',
    controller: 'SpendingCtrl',
    data: {
      title: 'Monthly Spending'
    }
  })
  .state('plan-builder.savings', {
    url: '/savings',
    templateUrl: 'app/plan-builder/savings/savings.html',
    controller: 'SavingsCtrl',
    data: {
      title: 'Savings Contributions'
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
