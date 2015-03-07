'use strict';

angular.module('prosperenceApp')
  .controller('CoursesCtrl', ['$scope', 'search', function($scope, search) {
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
    $scope.startDurationFilter = 0;
    $scope.endDurationFilter = 0;

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
      search.doSearch(searchTerm, pageNumber, filterFields, null, function(newProducts) {
        search.processFacets(newProducts);
      });
    };

    // Function for fetch page results.
    $scope.fetchPage = function(searchTerm, pageNumber) {
      pageNumber = (pageNumber - 1) * 12;
      $scope.doSearch(searchTerm, pageNumber);
    };

    // Function to sort by duration
    $scope.doDurationSort = function() {
      //remove existing duration filter, if exists
      $scope.filterFields.forEach(function(filter, i) {
        if(filter.term === 'duration') {
          $scope.filterFields.splice(i, 1);
        }
      });

      // filter by duration range
      $scope.doSearchByFilter('duration', '[' + $scope.startDurationFilter + ',' + $scope.endDurationFilter + ']');
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
    //initially, if products empty, then call search to show items
    $scope.doSearch('', 0, function(newProducts) {
      $scope.products = newProducts;
    });

    $scope.$on('search-in-progress', function(event, args) {
      $scope.products.results = [];
      $scope.products.totalCount = 0;
      $scope.searchInProgress = true;
    })
  }]);

