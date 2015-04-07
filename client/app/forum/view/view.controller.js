'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $state, $http) {
  $scope.currentQuestion = $scope.currentQuestion || {};

  // Retreive the question object from the database.
  $http.get('/api/questions/' + $state.params.questionId)
  .success(function(currentQuestion) {
    $scope.currentQuestion = currentQuestion;
  });

  $scope.goBack = function() {
    $state.go('forum.search');
  };

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

});
