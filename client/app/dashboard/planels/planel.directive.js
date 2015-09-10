(function () {
  'use strict';

  angular.module('prosperenceApp.planel.directive', [])
  .directive('planel', function () {
    return {
      restrict: 'E',
      scope: {
        params: '='
      },
      controller: function ($scope) {
        // Add planel to dashboard overview if not already included there.
        $scope.addToOverview = function () {
          //
        };

        // Remove planel from dashboard overview (if it is there and the user selects to remove it).
        $scope.removeFromOverview = function () {
          //
        };
      },
      controllerAs: 'vm',
      templateUrl: 'app/dashboard/planels/planel.html'
    };
  });

})();
