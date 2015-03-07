'use strict';

angular.module('prosperenceApp')
.controller('NavbarCtrl', function($scope, $state, $location, Auth, $modal) {

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.menu = [{
    'title': 'Prosperence',
    'link': 'main',
    'style': 'font-size:18px;',
    'shown': true
  }, {
    'title': 'About',
    'link': 'about',
    'shown': true
  }, {
    'title': 'Start Planning',
    'link': 'plan-builder.start',
    'shown': '!getCurrentUser().planBuilderComplete',
    'abstractLink': 'plan-builder'
  }, {
    'title': 'Dashboard',
    'link': 'dashboard.overview',
    'shown': 'isLoggedIn()',
    'abstractLink': 'dashboard'
  }, {
    'title': 'University',
    'icon': 'fa fa-graduation-cap',
    'link': 'university.welcome',
    'shown': true,
    'abstractLink': 'university'
  }, ];

  var loginController = function($scope) {
    $scope.onRegister = false;
    $scope.toggleRegister = function() {
      $scope.onRegister = !$scope.onRegister;
    }
  }

  $scope.openLoginModal = function(goToSignUp) {
    $modal.open({
      templateUrl: 'components/navbar/partials/loginModal.html',
      size: 'lg',
      controller: loginController
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

      // Sets active class on sidebar.
  $scope.isActive = function(viewLocation) {
    return $state.includes(viewLocation);
  };
  
});
