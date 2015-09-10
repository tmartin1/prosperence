(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.controller', [])
  .controller('DashboardCtrl', function ($state, User, Auth, CalcsService, DashboardService) {
    var vm = this;
    vm.user = Auth.getCurrentUser();
    vm.plan = vm.user.plan;

    // Overview default planels.
    var defaultOverviewPlanels = DashboardService.defaultOverviewPlanels;

    DashboardService.updateChartMenu();

  });

})();
