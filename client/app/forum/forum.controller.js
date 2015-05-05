'use strict';

angular.module('prosperenceApp')
.controller('ForumCtrl', function ($scope, $rootScope, $http, socket, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.user.starredQuestions = $scope.user.starredQuestions || {};
  $scope.currentQuestions = [];
  var questionLibrary = questionLibrary || [];

  $scope.categories = ['Debt Management', 'Retirement Savings', 'Investing', 'Life Insurance', 'Health Insurance', 'Disability Insurance'];

  // Get list of questions from the database.
  var getQuestions = function(resetView) {
    $http.get('/api/questions').success(function(allQuestions) {
      questionLibrary = allQuestions;
      if (!!resetView) $scope.currentQuestions = questionLibrary;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };

  // Reset question view to default view.
  $scope.defaultView = function() {
    getQuestions(true);
  };
  $scope.defaultView();

  // Display questions authored by the current user.
  $scope.displayMyQuestions = function() {
    $http.get('/api/questions/mine/' + $scope.user._id).success(function(data) {
      $scope.currentQuestions = data;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };

  // Display questions that the user has starred.
  $scope.displayStarredQuestions = function() {
    // TODO: Set currentQuestions to stared questions. Add 'Starred' link to 'Links' section.
  };

  // Search for questions in database and display those questions.
  $scope.searchByKeyword = function() {
    var results = [];
    getQuestions();
    for (var i=0, n=questionLibrary.length; i<n; i++) {
      if (questionLibrary[i].text.match($scope.keywords)) {
        results.push(questionLibrary[i]);
      }
    }
    $scope.currentQuestions = results;
  };

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
