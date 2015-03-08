'use strict';

angular.module('prosperenceApp')
.controller('MyPlanCtrl', function ($scope, User, Auth) {
  //

  // Check highcharts menu and update if needed. This line must be lower than the last highchart.
  $scope.updateChartMenu();
});
