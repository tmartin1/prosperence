'use strict';

angular.module('prosperenceApp')
.controller('QuestionSearchCtrl', function ($scope, $state, $http) {
  
  // View specific question.
  $scope.viewQuestion = function(question) {
    $state.go('forum.view', { questionId: question._id });
  };

});
