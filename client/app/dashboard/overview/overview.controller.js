'use strict';

angular.module('prosperenceApp')
.controller('OverviewCtrl', function ($scope, User, Auth) {

  // Create and append saved planels to the overview.
  for (var i=0; i<$scope.overviewPlanels.length; i++) {
    $('#overviewPlanelContainer').append($scope.overviewPlanels[i]);
  }
});
