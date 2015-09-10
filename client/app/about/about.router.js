(function () {
  'use strict';

  angular.module('prosperenceApp.about.router', [])
  .config(function ($stateProvider) {
    $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutCtrl',
      controlerAs: 'vm'
    });
  });

})();
