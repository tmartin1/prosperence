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
      .state('tax', {
        url: '/tax',
        templateUrl: 'app/plan-builder/tax/tax.html',
        controller: 'NwsCtrl'
      })
      .state('risk', {
        url: '/risk',
        templateUrl: 'app/plan-builder/risk/risk.html',
        controller: 'NwsCtrl'
      })
      .state('retire', {
        url: '/retire',
        templateUrl: 'app/plan-builder/retire/retire.html',
        controller: 'NwsCtrl'
      });
  });
  