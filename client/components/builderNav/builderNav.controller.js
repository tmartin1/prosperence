'use strict';

angular.module('prosperenceApp')
  .controller('BuilderNavCtrl', function ($scope, $location, Auth) {
    // Defines the order of how pages are displayed to the user.
    var order = [
      '/nws',
      '/tax',
      '/msa',
      '/risk',
      '/retire'
    ];
    var current = order.indexOf($location.path());
    $scope.previous = order[current-1] || false;
    $scope.next = order[current+1] || false;
    $scope.progress = (current / order.length) * 100 + '%';

    $scope.isCollapsed = true;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.save = function(route) {
      console.log('saving');
    };

  });