'use strict';

angular.module('prosperenceApp')
.controller('UniversityCtrl', function($scope, search) {
    $scope.doSearch = function(searchTerm, pageNumber) {
      pageNumber = pageNumber || 0;
      $scope.searchTerm = searchTerm;

      search.doSearch(searchTerm, pageNumber, null, null, function(newProducts) {
        newProducts = search.processFacets(newProducts);
        $rootScope.$broadcast('products-updated', {
          newProducts: newProducts
        });
        search.fromNavBar = true;
      });
    };

    $scope.doSuggestor = function(searchTerm) {
      $scope.searchTerm = searchTerm;
      search.doSuggestor(searchTerm, function(newProducts) {
        $scope.suggestedProducts = newProducts;
      });
    };

    //when enter pressed, trigger search if no suggestions given
    $rootScope.$on('keypress', function(onEvent, keypressEvent) {
      var keyCode = keypressEvent.which;

      if (keyCode === 13 && $scope.searchTerm) {
        $scope.doSearch($scope.searchTerm);
      }
    });

  });
