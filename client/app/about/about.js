'use strict';

angular.module('prosperenceApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: 'app/about/about.html',
    controller: 'AboutCtrl'
  });
});
