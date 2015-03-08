'use strict';

angular.module('prosperenceApp')
.controller('OverviewCtrl', function ($scope, User, Auth) {

  // Create and append saved planels to the overview.
  for (var key in $scope.user.overviewPlanels) {
    $('#overviewPlanelContainer').append($scope.user.overviewPlanels[key]);
  }

});
