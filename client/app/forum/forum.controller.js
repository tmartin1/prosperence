(function () {
  'use strict';

  angular.module('prosperenceApp.forum.controller', [])
  .controller('ForumCtrl', function ($scope, $rootScope, $http, socket, Auth, ForumService) {
    var vm = this;
    vm.user = Auth.getCurrentUser();
    vm.user.forum = vm.user.forum || {};
    vm.user.forum.starred = vm.user.forum.starred || {};
    vm.user.forum.comments = vm.user.forum.comments || {};
    vm.currentQuestions = [];

    vm.categories = ForumService.getCategories();

    // Get list of questions from the database.
    // Reset question view to default view.
    vm.defaultView = function () {
      $http.get('/api/questions').success(function(data) {
        vm.currentQuestions = data;
        socket.syncUpdates('question', vm.currentQuestions);
      });
    };
    vm.defaultView();

    // Display questions authored by the current user.
    vm.displayMyQuestions = function () {
      $http.get('/api/questions/mine/' + vm.user._id).success(function(data) {
        vm.currentQuestions = data;
        socket.syncUpdates('question', vm.currentQuestions);
      });
    };

    // Display questions that the user has starred.
    vm.displayStarredQuestions = function () {
      $http.get('/api/questions/starred/' + JSON.stringify(Object.keys(vm.user.forum.starred))).success(function (data) {
        vm.currentQuestions = data;
        socket.syncUpdates('question', vm.currentQuestions);
      });
    };

    // Search for questions in database and display those questions.
    vm.searchByKeyword = function () {
      var keywords = JSON.stringify(vm.keywords.split(' '));
      $http.get('/api/questions/search/' + keywords).success(function(data) {
        vm.currentQuestions = data;
        socket.syncUpdates('question', vm.currentQuestions);
      });
    };

    // Delete specific question.
    vm.deleteQuestion = function (question) {
      $http.delete('/api/questions/' + question._id);
    };

    // Update sockets when question is deleted.
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('question');
    });

    // Directs user to login or to the input to submit a new question.
    vm.askNewQuestion = function () {
      // If user is not logged in, show login modal.
      if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
      // If user is logged in, then set focus to the 'ask question' input field.
      else $('#newQuestion').focus();
    };

  });

})();
