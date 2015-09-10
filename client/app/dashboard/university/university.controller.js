(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.university', [])
  .controller('MyUniversityCtrl', function (Auth, DashboardService) {
    var vm = this;
    vm.temp = {};

    // Check highcharts menu and update if needed. This line must be lower than the last highchart.
    DashboardService.updateChartMenu();
  });

})();
