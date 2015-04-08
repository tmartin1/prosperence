'use strict';

angular.module('prosperenceApp')
.controller('ForumCtrl', function ($scope, $rootScope, $http, socket, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.user.starredQuestions = $scope.user.starredQuestions || {};
  $scope.currentQuestions = [];

  // Get list of questions from the database.
  $http.get('/api/questions').success(function(currentQuestions) {
    $scope.currentQuestions = currentQuestions;
    socket.syncUpdates('question', $scope.currentQuestions);
  });

  $scope.categories = [ 'Debt Management', 'Insurance Planning', 'Retirement Savings', 'etc.' ];

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('question');
  });
});
