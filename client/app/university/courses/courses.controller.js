'use strict';

angular.module('prosperenceApp')
  .controller('CoursesCtrl', ['$scope', 'search', '$rootScope', function($scope, search, $rootScope) {
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

    // Search by facet filter.
    $scope.doSearchByFilter = function(term, value) {
      $scope.checked[value] = !$scope.checked[value];

      if($scope.checked[value]) {
        $scope.filterFields.push({
          term: term,
          value: value
        });
      } else {
        $scope.filterFields.forEach(function(filter, i) {
          if(filter.value === value) {
            $scope.filterFields.splice(i, 1);
          }
        })
      }

      $scope.doSearch($scope.searchTerm, 0, $scope.filterFields);
    };

    $scope.doSearch = function(searchTerm, pageNumber, filterFields) {
      pageNumber = pageNumber || 0;
      filterFields = filterFields || null;
      $scope.searchTerm = searchTerm;
      search.doSearch(searchTerm, pageNumber, filterFields, null, function(newCourses) {
        newCourses = search.processFacets(newCourses);
        $rootScope.$broadcast('courses-updated', {
          newCourses: newCourses
        });
      });
    };

    // Function for fetch page results.
    $scope.fetchPage = function(searchTerm, pageNumber) {
      pageNumber = (pageNumber - 1) * 12;
      $scope.doSearch(searchTerm, pageNumber);
    };

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
    $scope.$on('courses-updated', function (event, args) {
      $scope.courses = args.newCourses;
      $scope.searchInProgress = false;
    });

    $scope.$on('search-in-progress', function(event, args) {
      $scope.courses.results = [];
      $scope.courses.totalCount = 0;
      $scope.searchInProgress = true;
    })
  }]);

