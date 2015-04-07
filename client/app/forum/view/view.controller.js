'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $state, $http) {
  $scope.currentQuestion = $scope.currentQuestion || {};

  // Retreive the question object from the database.
  $http.get('/api/questions/' + $state.params.questionId)
  .success(function(currentQuestion) {
    $scope.currentQuestion = currentQuestion;
  });

  // Go back to the main question search state.
  $scope.goBack = function() {
    $state.go('forum.search');
  };

  // Star or unstar a specific question. Track in user.starredQuestions and adjust question rating accordingly.
  $scope.starQuestion = function() {
    $scope.user.starredQuestions[$scope.currentQuestion._id] = !$scope.user.starredQuestions[$scope.currentQuestion._id];
    if (!!$scope.user.starredQuestions[$scope.currentQuestion._id]) {
      $scope.upVote($scope.currentQuestion);
      $http.put('/api/questions/' + $state.params.questionId, { rating: $scope.currentQuestion.rating++ });
    } else {
      $scope.downVote($scope.currentQuestion);
      $http.put('/api/questions/' + $state.params.questionId, { rating: $scope.currentQuestion.rating-- });
    }
  };

  // Delete specific question.
  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

});
