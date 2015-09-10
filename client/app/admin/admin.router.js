(function () {
  'use strict';

  angular.module('prosperenceApp.admin.router', [])
    .config(function ($stateProvider) {
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminCtrl',
          controlerAs: 'vm'
        });
    });

})();
