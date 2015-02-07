'use strict';

angular.module('prosperenceApp')
  .controller('UniversityCtrl', function($scope, $state) {

    // Sets active class on sidebar.
    $scope.isActive = function(viewLocation) {
      return viewLocation === $state.current.url;
    };

  });
