'use strict';

angular.module('prosperenceApp')
.controller('MainCtrl', function($scope, $state, Auth) {
  if(Auth.isLoggedIn()) {
    $state.go('dashboard.overview');
  }
});
