'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $state, $http, socket) {

  // Catch question object from state transition params.
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'forum.view') {
      $scope.currentQuestion = $http.get('/api/questions/'+toParams.questionId).success(function(currentQuestion) {
        $scope.currentQuestion = currentQuestion;
      });
    }
  });

  $scope.goBack = function() {
    $state.go('forum.search');
  };

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

});
