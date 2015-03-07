'use strict';

angular.module('prosperenceApp')
.controller('UniversityCtrl', ['$scope', 'search', '$rootScope', function($scope, search, $rootScope) {
  $scope.facetFields = "";
  $scope.filterFields = "";
  $scope.selectedItems = [];
  $scope.from = 0;
  $scope.page = 1;
  $scope.prevPage = 1;
  $scope.noOfSuggests = 5;
  $scope.checked = [];
  $scope.filterFields = [];
  $scope.searchInProgress = true;
  $scope.clickLimit = 5;
  $scope.showMoreFacets = true;
  $scope.startMinutesFilter = 0;
  $scope.endMinutesFilter = 0;

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

  // Function to sort by minutes
  $scope.doMinutesSort = function() {
    //remove existing minutes filter, if exists
    $scope.filterFields.forEach(function(filter, i) {
      if(filter.term === 'minutes') {
        $scope.filterFields.splice(i, 1);
      }
    });

    // filter by minutes range
    $scope.doSearchByFilter('minutes', '[' + $scope.startMinutesFilter + ',' + $scope.endMinutesFilter + ']');
  };

  //ajax call to show more favorite records
  $scope.showMoreFacetLinks = function(numberToShow) {
    // toggle to "Show Less"
    $scope.showMoreFacets = false;

    // set limit filter for ng-repeat
    $scope.clickLimit = numberToShow;
  };

  //ajax call to show less favorite records
  $scope.showLessFacetLinks = function() {
    // toggle to "Show More"
    $scope.showMoreFacets = true;

    // set limit filter for ng-repeat
    $scope.clickLimit = 5;
  };

  //INIT
  //initially, if courses empty, then call search to show items
  $scope.doSearch('', 0, function(newCourses) {
    $scope.courses = newCourses;
  });

  //listen for courses-updated event, which is broadcasted from navbar.controller.js
  $scope.$on('courses-updated', function(event, args) {
    $scope.courses = args.newCourses;
    $scope.searchInProgress = false;
  });

  $scope.$on('search-in-progress', function(event, args) {
    $scope.courses.results = [];
    $scope.courses.totalCount = 0;
    $scope.searchInProgress = true;
  })

}]);
