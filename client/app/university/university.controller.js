'use strict';

angular.module('prosperenceApp')
  .controller('UniversityCtrl', ['$scope', 'search', '$rootScope', function($scope, search, $rootScope) {
    $scope.doSearch = function(searchTerm, pageNumber) {
      pageNumber = pageNumber || 0;
      $scope.searchTerm = searchTerm;

      search.doSearch(searchTerm, pageNumber, null, null, function(newCourses) {
        newCourses = search.processFacets(newCourses);
        $rootScope.$broadcast('courses-updated', {
          newCourses: newCourses
        });
        search.fromNavBar = true;
      });
    };

    $scope.doSuggestor = function(searchTerm) {
      $scope.searchTerm = searchTerm;
      search.doSuggestor(searchTerm, function(newCourses) {
        $scope.suggestedCourses = newCourses;
      });
    };

    //when enter pressed, trigger search if no suggestions given
    $rootScope.$on('keypress', function(onEvent, keypressEvent) {
      var keyCode = keypressEvent.which;

      if(keyCode === 13 && $scope.searchTerm) {
        $scope.doSearch($scope.searchTerm);
      }
    });

  }]);
