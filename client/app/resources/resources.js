'use strict';

angular.module('prosperenceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('resources', {
        url: '/resources',
        templateUrl: 'app/resources/resources.html',
        controller: 'ResourcesCtrl'
      });
  });