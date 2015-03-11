'use strict';

angular.module('prosperenceApp')
.controller('NetWorthCtrl', function ($scope) {
  $scope.plan = $scope.plan || $scope.user.plan;

  $scope.netWorthPlanels = [
    'net-worth-chart',
    'net-worth-statement' // TODO: Make nws planel
  ];

});
