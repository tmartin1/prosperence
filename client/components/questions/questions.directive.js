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
      plangroup: '=',
      next: '&'
    },
    controller: function($scope) {
      // By default, the first question in the series is opened
      $scope.queries[0].isOpen = true;
      $scope.queries[0].isEnabled = true;

      console.log($scope.queries)

      // TODO: Previously enabled sections should remain enables if the user goes back.

      // Advances the focus of the user to the next fillable field when 'enter' is pressed.
      $('questions').keypress(function() {
        if (event.keyCode == 13) {
          var textboxes = $('input:visible');
          // TODO: Figure out how to handle select fields in questions.
          // if ($('select:visible').length) {
          //   console.log('selects');
          //   console.log($('select:visible'));
          //   textboxes.concat($('select:visible'));
          // }
          var currentBox;
          // console.log($('input:focus'));
          if ($('input:focus').length > 0) {
            currentBox = $('input:focus');
          }
          // else if ($('select:focus').length > 0) {
          //   currentBox = $('select:focus');
          // }
          // var currentBox = $('input:focus') || $('select:focus');
          var currentIndex = textboxes.index(currentBox);
          console.log(currentBox);
          // If there is another input fields, move focus to that field.
          if (textboxes[currentIndex + 1] !== undefined) {
            console.log('advancing to next input');
            var nextBox = textboxes[currentIndex + 1];
            nextBox.focus();
            nextBox.select();
          } else {
            // If the user is on the last input in the current question, move to next question or section.
            console.log('advancing to next question');
            $scope.next();
          }
          // event.preventDefault();
          // return false;
        }
      });
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
      plangroup: '='
    },
    controller: function($scope) {
      if ($scope.query.isComplete) $scope.query.isEnabled = true;

      // TODO: Set binding of nested objects.
      // If query is binding to a nested object, recursively track through plan to assign binding.
      var setBinding = function(path) {
        // debugger;
        if ($scope.plangroup[path[0]] === undefined) {
          if ($scope.query.type === 'table') $scope.plangroup[path[0]] = [];
          else $scope.plangroup[path[0]] = {};
        }
        $scope.plangroup = $scope.plangroup[path.shift()];
        if (path.length > 1) setBinding(path);
        else $scope.query.bind = path.shift();
      };

      if (!!$scope.query.bind && $scope.query.bind.split('.').length > 1) {
        // If plangroup is undefined, then initialize it as an empty object.
        if ($scope.plangroup === undefined) $scope.plangroup = {};
        // Set binding to nested property.
        setBinding($scope.query.bind.split('.'));
      }

      // If a binding is defined for a multi question object,
      if ($scope.query.type === 'multi' && $scope.query.bind) {
        $scope.plangroup = $scope.plangroup[$scope.query.bind];
      }

      // Creates a new row for the input table.
      var makeRow = function() {
        var row = {};
        for(var i = 0; i < $scope.query.fields.length; i++) {
          row[$scope.query.fields[i].label] = '';
        }
        return row;
      };

      $scope.addRow = function(property) {
        $scope.plangroup[property] = $scope.plangroup[property] || [];
        $scope.plangroup[property].push(makeRow());
      };
      $scope.deleteRow = function(index, property) {
        $scope.plangroup[property].splice(index, 1);
      };
      $scope.isEnabled = function(title) {
        return $scope.sections.enabled[title];
      };
      $scope.isComplete = function(title) {
        return $scope.sections.complete[title];
      };

      // If property is empty and input type is a table, start with an empty row.
      if ($scope.query.type === 'table') {
        $scope.plangroup[$scope.query.bind] = $scope.plangroup[$scope.query.bind] || [makeRow()];
      }
    },
    templateUrl: './components/questions/questionTemplate.html'
  };
});
