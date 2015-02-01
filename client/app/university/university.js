'use strict';

angular.module('prosperenceApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/university/welcome");

    $stateProvider
      .state('university', {
        url: '/university',
        templateUrl: 'app/university/university.html',
        controller: 'UniversityCtrl',
        abstract: true
      })
      .state('university.courses', {
        url: '/courses',
        templateUrl: 'app/university/courses/courses.html',
        controller: 'CoursesCtrl'
      })
      .state('university.paths', {
        url: '/paths',
        templateUrl: 'app/university/paths/paths.html',
        controller: 'PathsCtrl'
      })
      .state('university.resources', {
        url: '/resources',
        templateUrl: 'app/university/resources/resources.html',
        controller: 'ResourcesCtrl'
      })
      .state('university.welcome', {
        url: '/welcome',
        templateUrl: 'app/university/welcome/welcome.html',
        controller: 'WelcomeCtrl'
      });
  });
