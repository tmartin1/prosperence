(function () {
  'use strict';

  angular.module('prosperenceApp.admin.controller', [])
  .controller('AdminCtrl', function ($http, Auth, User) {

    // Use the User $resource to fetch all users
    vm.users = User.query();

    vm.delete = function (user) {
      User.remove({
        id: user._id
      });
      angular.forEach($scope.users, function (u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });

})();
