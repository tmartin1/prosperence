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

  // Submit a new question.
  $scope.addQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) {
      return $rootScope.openLoginModal();
    }
    // Only non-advisors can post questions.
    if (!Auth.isAdvisor()) {
      if($scope.newQuestion === '') return;
      $http.post('/api/questions', {
        text: $scope.newQuestion,
        author: Auth.getCurrentUser()
      });
      $scope.newQuestion = '';
    }
  };

  // Increment rating of question or comment by one.
  $scope.upVote = function(item) {
    return item.rating++;
  };

  // Decrement rating of question or comment by one.
  $scope.downVote = function(item) {
    return item.rating--;
  };

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('question');
  });
});
