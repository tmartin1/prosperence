'use strict';

angular.module('prosperenceApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('university', {
        url: '/university',
        templateUrl: 'app/university/university.html',
        controller: 'UniversityCtrl'
      });
  });
