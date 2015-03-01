'use strict';

angular.module('prosperenceApp')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/dashboard', '/dashboard/overview');

  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    authenticate: true,
    onEnter: function($state) {
      console.log($state);
      // $state.go('dashboard.overview');
    }
    // abstract: true
  })
  .state('dashboard.my-plan', {
    url: '/my-plan',
    templateUrl: 'app/dashboard/my-plan/my-plan.html',
    controller: 'MyPlanCtrl',
    authenticate: true
  })
  .state('dashboard.overview', {
    url: '/overview',
    templateUrl: 'app/dashboard/overview/overview.html',
    controller: 'OverviewCtrl',
    authenticate: true
  })
  .state('dashboard.settings', {
    url: '/settings',
    templateUrl: 'app/dashboard/settings/settings.html',
    controller: 'SettingsCtrl',
    authenticate: true
  });
});
