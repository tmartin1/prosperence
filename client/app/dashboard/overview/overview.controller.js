(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.overview', [])
  .controller('OverviewCtrl', function (Auth, DashboardService) {
    var vm = this;
    vm.user = Auth.getCurrentUser();

    vm.planelLibrary = DashboardService.planelLibrary;

    vm.user.overviewPlanels = vm.user.overviewPlanels || DashboardService.defaultOverviewPlanels;
  });

})();
