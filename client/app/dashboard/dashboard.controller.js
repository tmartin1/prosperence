'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope) {
  $scope.sidebar = [{
    title: 'Overview',
    link: 'dashboard.overview',
    icon: ''
  }, {
    title: 'My Plan',
    link: 'dashboard.my-plan',
    icon: ''
  }, {
    title: 'Account Settings',
    link: 'dashboard.settings',
    icon: 'glyphicon glyphicon-cog'
  }];
});
