'use strict';

angular.module('prosperenceApp')
.controller('MainCtrl', function($scope, $state, Auth, CalcsService) {
  if(Auth.isLoggedIn()) {
    $state.go('dashboard.overview');
  }

  debugger;
  CalcsService.getMarketHistory()
  .then(function(rsp) {
    console.log(rsp);
  },
  function(err) {
    console.log(err);
  });
});
