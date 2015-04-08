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
      if ($scope.user.starredQuestions[qid]) {
        delete $scope.user.starredQuestions[qid];
        $scope.currentQuestion.rating--;
      } else {
        $scope.user.starredQuestions[qid] = true;
        $scope.currentQuestion.rating++;
      }
      $http.put('/api/questions/' + qid, { rating: $scope.currentQuestion.rating });
    }
  };

  // Increment or decriment the rating of comment by one.
  $scope.vote = function(comment, mod) {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can up/downvote comments.
    if (!Auth.isAdvisor()) {
      comment.rating += (mod === 'up' ? 1 : -1);
      $http.put('/api/questions/' + qid, { comments: $scope.currentQuestion.comments });
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
    $http.put('/api/questions/' + qid, { comments: $scope.currentQuestion.comments });
  };

  // Delete specific question.
  $scope.deleteQuestion = function() {
    $state.go('forum.search');
    $http.delete('/api/questions/' + qid);
  };

});
