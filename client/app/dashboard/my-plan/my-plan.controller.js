(function () {
  'use strict';

  angular.module('prosperenceApp.dashboard.myPlan.controller', [])
  .controller('MyPlanCtrl', function ($state, Auth, DashboardService) {
    if ($state.current.name === 'dashboard.my-plan') $state.go('dashboard.my-plan.net-worth', null, { reload: true });

    var vm = this;
    vm.user = Auth.getCurrentUser();
    vm.plan = vm.user.plan;
    vm.$state = $state;

    vm.planelLibrary = DashboardService.planelLibrary;
    if ($state.current.data) vm.currentPlanels = $state.current.data.planels;

    // Check highcharts menu and update if needed. This line must be lower than the last highchart.
    DashboardService.updateChartMenu();
  });

})();
