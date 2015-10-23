(function () {
  'use strict';

  angular.module('prosperenceApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/university', '/university/welcome');

    $stateProvider
    .state('university', {
      url: '/university',
      templateUrl: 'app/university/university.html',
      controller: 'UniversityCtrl',
      controllerAs: 'vm',
      abstract: true
    })
    .state('university.courses', {
      url: '/courses',
      templateUrl: 'app/university/courses/courses.html',
      controller: 'CoursesCtrl'
      controllerAs: 'vm'
    })
    .state('university.favorites', {
      url: '/favorites',
      templateUrl: 'app/university/courses/courses.html',
      controller: 'FavoritesCtrl'
      controllerAs: 'vm'
    })
    .state('university.recommended', {
      url: '/recommended',
      templateUrl: 'app/university/courses/courses.html',
      controller: 'RecommendedCtrl'
      controllerAs: 'vm'
    })
  });

})();
