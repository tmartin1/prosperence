'use strict';

angular.module('prosperenceApp')
.controller('BudgetCtrl', function ($scope, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;

  // Array of charts to display on the budget page.
  $scope.budgetCharts = [];

});
