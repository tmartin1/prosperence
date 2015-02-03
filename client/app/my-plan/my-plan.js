'use strict';

angular.module('prosperenceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-plan', {
        url: '/my-plan',
        templateUrl: 'app/my-plan/my-plan.html',
        controller: 'MyPlanCtrl'
      });
  });