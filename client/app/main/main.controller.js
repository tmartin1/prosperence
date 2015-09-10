(function () {
  'use strict';

  angular.module('prosperenceApp.main.controller', [])
  .controller('MainCtrl', function ($state, Auth, CalcsService) {
    if (Auth.isLoggedIn()) {
      $state.go('dashboard.overview');
    }
  });

})();
