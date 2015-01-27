'use strict';

angular.module('prosperenceApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      { 'title': 'Home', 'link': '/' },
      { 'title': 'About', 'link': '/about' },
      { 'title': 'Resources', 'link': '/resources' },
      { 'title': 'Start My Plan', 'link': '/plan-builder' }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });