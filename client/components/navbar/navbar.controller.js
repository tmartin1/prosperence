'use strict';

angular.module('prosperenceApp')
  .controller('NavbarCtrl', function($scope, $location, Auth) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'shown': true
    }, {
      'title': 'About',
      'link': '/about',
      'shown': true
    }, {
      'title': 'My Plan',
      'link': '/my-plan',
      'shown': 'isLoggedIn()'
    }, {
      'title': 'Start Planning',
      'link': '/plan-builder',
      'shown': '!isLoggedIn()'
    }, {
      'title': 'University of Prosperence',
      'class': 'fa fa-graduation-cap',
      'link': '/university',
      'shown': true
    }, ];

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
