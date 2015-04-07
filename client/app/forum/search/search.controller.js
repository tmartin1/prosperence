'use strict';

angular.module('prosperenceApp')
.controller('QuestionSearchCtrl', function ($scope, $state, $http, socket) {
  // Retrieve and display a specific question.
  $scope.viewQuestion = function(question) {
    console.log(question)
    $state.go('forum.view', { questionId: question._id });
  };
});
