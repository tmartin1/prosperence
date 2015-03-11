'use strict';

angular.module('prosperenceApp')
.controller('NetWorthCtrl', function ($scope) {
  $scope.plan = $scope.plan || $scope.user.plan;

  // Array of planels to display on the net worth page.
  $scope.netWorthPlanels = [
    'net-worth-chart',
    'net-worth-statement' // TODO: Make nws planel
  ];

});
