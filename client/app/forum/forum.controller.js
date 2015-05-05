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

  $scope.categories = [ 'Debt Management', 'Retirement Savings', 'Life Insurance', 'Health Insurance', 'Disability Insurance' ];

  // Delete specific question.
  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

  // Update sockets when question is deleted.
  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('question');
  });

  // Directs user to login or to the input to submit a new question.
  $scope.askNewQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // If user is logged in, then set focus to the 'ask question' input field.
    else $('#newQuestion').focus();
  };

});
