'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $rootScope, $state, $http, Auth) {
  $scope.currentQuestion = $scope.currentQuestion || {};
  var qid = $state.params.questionId;

  // Retreive the question object from the database.
  function getQuestion() {
    $http.get('/api/questions/' + qid)
    .success(function(currentQuestion) {
      $scope.currentQuestion = currentQuestion;
    })
    .error(function() {
      console.log('Question not found. Redirecting to main forum page.');
      $state.go('forum.search');
    });
  };
  getQuestion();

  function updateQuestion() {
    $http.put('/api/questions/' + qid, { comments: $scope.currentQuestion.comments });
  };

  // Go back to the main question search state.
  $scope.goBack = function() {
    $state.go('forum.search');
  };

  // Star or unstar a specific question. Track in user.starredQuestions and adjust question rating accordingly.
  $scope.starQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can star questions.
    if (!Auth.isAdvisor()) {
      $scope.user.starredQuestions[qid] = !$scope.user.starredQuestions[qid];
      !!$scope.user.starredQuestions[qid] ? $scope.currentQuestion.rating++ : $scope.currentQuestion.rating--;
      updateQuestion();
    }
  };

  // Increment or decriment the rating of comment by one.
  $scope.vote = function(comment, mod) {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can up/downvote comments.
    if (!Auth.isAdvisor()) {
      comment.rating += (mod === 'up' ? 1 : -1);
      updateQuestion();
    }
  };

  // Adds new comment to the question.
  $scope.addComment = function() {
    $scope.currentQuestion.comments.push({
      name: $scope.user.name,
      rating: 0,
      text: $scope.newComment,
      timestamp: new Date()
    });
    updateQuestion();
  };

  // Delete specific question.
  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

});
