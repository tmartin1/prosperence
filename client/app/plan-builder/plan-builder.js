'use strict';

angular.module('prosperenceApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/plan-builder/start");

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
        controller: 'PlanBuilderCtrl'
      })
      .state('plan-builder.nws', {
        url: '/nws',
        templateUrl: 'app/plan-builder/nws/nws.html',
        controller: 'NwsCtrl'
      })
      .state('plan-builder.msa', {
        url: '/msa',
        templateUrl: 'app/plan-builder/msa/msa.html',
        controller: 'NwsCtrl'
      })
      .state('plan-builder.tax', {
        url: '/tax',
        templateUrl: 'app/plan-builder/tax/tax.html',
        controller: 'NwsCtrl'
      })
      .state('plan-builder.risk', {
        url: '/risk',
        templateUrl: 'app/plan-builder/risk/risk.html',
        controller: 'NwsCtrl'
      })
      .state('plan-builder.retire', {
        url: '/retire',
        templateUrl: 'app/plan-builder/retire/retire.html',
        controller: 'NwsCtrl'
      });
  });
