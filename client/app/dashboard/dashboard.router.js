(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/overview');

    $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vm',
      authenticate: true
      // abstract: true
    })
    .state('dashboard.overview', {
      url: '/overview',
      templateUrl: 'app/dashboard/overview/overview.html',
      controller: 'OverviewCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('dashboard.my-plan', {
      url: '/my-plan',
      templateUrl: 'app/dashboard/my-plan/my-plan.html',
      controller: 'MyPlanCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('dashboard.progress', {
      url: '/progress',
      templateUrl: 'app/dashboard/progress/progress.html',
      controller: 'ProgressCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('dashboard.university', {
      url: '/university',
      templateUrl: 'app/dashboard/university/university.html',
      controller: 'MyUniversityCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('dashboard.settings', {
      url: '/settings',
      templateUrl: 'app/dashboard/settings/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'vm',
      authenticate: true
    });
  });

})();
