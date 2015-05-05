'use strict';

angular.module('prosperenceApp')
.controller('QuestionSearchCtrl', function ($scope, $rootScope, $state, $http, Auth) {

  // View specific question.
  $scope.viewQuestion = function(question) {
    $state.go('forum.view', { questionId: question._id });
  };

  // Submit a new question.
  $scope.addQuestion = function() {
    console.log($scope.newQuestion)
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can post questions.
    if (!Auth.isAdvisor()) {
      if($scope.newQuestion === '') return;
      $http.post('/api/questions', {
        text: $scope.newQuestion,
        author: Auth.getCurrentUser(),
        timestamp: new Date()
      });
      $scope.newQuestion = '';
    }
  };

});
