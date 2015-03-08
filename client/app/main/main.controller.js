'use strict';

angular.module('prosperenceApp')
.controller('MainCtrl', function($scope, $state, Auth, CalcsService) {
  if(Auth.isLoggedIn()) {
    $state.go('dashboard.overview');
  }
  CalcsService.getMarketHistory()
  .then(function(rsp) {
    console.log(rsp);
  });
});
