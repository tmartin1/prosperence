// ****************************************************************************
// Pease read the Question-Directive-README.md before editing this file.
// ****************************************************************************
'use strict';

angular.module('prosperenceApp')

// For displaying a collection of questions within one of the plan-builder sub-states.
// Accepts an array of queries objects as a parameter (see question directive for info on query objects.)
.directive('questions', function() {
  return {
    restrict: 'E',
    scope: {
      queries: '=',
      planGroup: '=',
      sections: '='
    },
    controller: function($scope) {
      // By default, the first question in the series is opened
      $scope.queries[0].isOpen = true;
      $scope.queries[0].isEnabled = true;

      // Enable the next accordion section each time the user moves to a new section.
      $scope.enableNext = function(index) {
        if (typeof index === 'number' && $scope.queries[index+1]) {
          $scope.queries[index + 1].isEnabled = true;
        }
      };
    },
    templateUrl: './components/questions/questionsTemplate.html'
  };
})

// Invoked from within the questions directive template.
// Accepts a single question object as a parameter.
.directive('question', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      query: '=',
      planGroup: '=',
      sections: '='
    },
    controller: function($scope) {
      // If a binding is defined for a multi question object,
      if ($scope.query.type === 'multi' && $scope.query.bind) {
        $scope.planGroup = $scope.planGroup[$scope.query.bind];
      }

      var makeRow = function(){
        var row = {};
        for(var i = 0; i < $scope.query.fields.length; i++){
          row[$scope.query.fields[i].label] = '';
        }
        return row;
      };

      $scope.addRow = function(property) {
        $scope.planGroup[property] = $scope.planGroup[property] || [];
        $scope.planGroup[property].push(makeRow());
      };
      $scope.deleteRow = function(index, property) {
        $scope.planGroup[property].splice(index, 1);
      };
      $scope.isEnabled = function(title){
        return $scope.sections.enabled[title];
      };
      $scope.isComplete = function(title){
        return $scope.sections.complete[title];
      };

      // If property is empty and input type is a table, start with an empty row.
      if ($scope.query.type === 'table') {
        $scope.planGroup[$scope.query.bind] = $scope.planGroup[$scope.query.bind] || [makeRow()];
      }
    },
    templateUrl: './components/questions/questionTemplate.html'
  };
});
