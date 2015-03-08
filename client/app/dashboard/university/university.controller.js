'use strict';

angular.module('prosperenceApp')
.controller('MyUniversityCtrl', function ($scope) {
  $scope.temp = {};

  // Check highcharts menu and update if needed. This line must be lower than the last highchart.
  $scope.updateChartMenu();
});
