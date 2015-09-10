(function () {
  'use strict';

  angular.module('prosperenceApp.forum.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/forum', '/forum/search');

    $stateProvider
    .state('forum', {
      url: '/forum',
      templateUrl: 'app/forum/forum.html',
      controller: 'ForumCtrl',
      controllerAs: 'vm',
      abstract: true
    })
    .state('forum.search', {
      url: '/search',
      templateUrl: 'app/forum/search/search.html',
      controller: 'QuestionSearchCtrl',
      controllerAs: 'vm'
    })
    .state('forum.view', {
      url: '/view/:questionId',
      templateUrl: 'app/forum/view/view.html',
      controller: 'QuestionViewCtrl',
      controllerAs: 'vm'
    });
  });

})();
