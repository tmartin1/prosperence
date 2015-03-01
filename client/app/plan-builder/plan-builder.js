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
      title: 'General Info'
    }
  })
  .state('plan-builder.nws', {
    url: '/nws',
    templateUrl: 'app/plan-builder/nws/nws.html',
    controller: 'NwsCtrl',
    data: {
      title: 'Net Worth Calculator'
    }
  })
  .state('plan-builder.msa', {
    url: '/msa',
    templateUrl: 'app/plan-builder/msa/msa.html',
    controller: 'MsaCtrl',
    data: {
      title: 'Budget Analysis'
    }
  })
  .state('plan-builder.tax', {
    url: '/tax',
    templateUrl: 'app/plan-builder/tax/tax.html',
    controller: 'TaxProjectionCtrl',
    data: {
      title: 'Income Tax Projection'
    }
  })
  .state('plan-builder.risk', {
    url: '/risk',
    templateUrl: 'app/plan-builder/risk/risk.html',
    controller: 'RiskAnalysisCtrl',
    data: {
      title: 'Risk Analysis'
    }
  })
  .state('plan-builder.retire', {
    url: '/retire',
    templateUrl: 'app/plan-builder/retire/retire.html',
    controller: 'RetireCtrl',
    data: {
      title: 'Retirement Projection'
    }
  });
});
