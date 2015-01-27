'use strict';

angular.module('prosperenceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plan-builder', {
        url: '/plan-builder',
        templateUrl: 'app/plan-builder/nws/nws.html',
        controller: 'NwsCtrl'
      })
      .state('nws', {
        url: '/nws',
        templateUrl: 'app/plan-builder/nws/nws.html',
        controller: 'NwsCtrl'
      })
      .state('msa', {
        url: '/msa',
        templateUrl: 'app/plan-builder/msa/msa.html',
        controller: 'NwsCtrl'
      })
      .state('tax-projection', {
        url: '/tax-projection',
        templateUrl: 'app/plan-builder/tax-projection/tax-projection.html',
        controller: 'NwsCtrl'
      })
      .state('risk-analysis', {
        url: '/risk-analysis',
        templateUrl: 'app/plan-builder/risk-analysis/risk-analysis.html',
        controller: 'NwsCtrl'
      })
      .state('retire', {
        url: '/retire',
        templateUrl: 'app/plan-builder/retire/retire.html',
        controller: 'NwsCtrl'
      });
  });
  