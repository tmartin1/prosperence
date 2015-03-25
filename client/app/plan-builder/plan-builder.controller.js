'use strict';

angular.module('prosperenceApp')
.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {
  $scope.isCollapsed = true;
  $scope.user = Auth.getCurrentUser() || {};
  $scope.user.personal = $scope.user.personal || {};
  $scope.user.plan = $scope.user.plan || {};

  // List of states for location questions.
  $scope.states = [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
        'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS',
        'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
        'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ];

  // Defines the order of how pages are displayed to the user.
  var order = [
    'plan-builder.start',
    'plan-builder.basics',
    'plan-builder.assets',
    'plan-builder.debts',
    'plan-builder.spending',
    'plan-builder.savings',
    'plan-builder.insurances',
    'plan-builder.tax',
    'plan-builder.goals'
  ];

  // Sets the title, progress bar, and the 'previous' and 'next' links.
  function updateRelationals(focus) {
    $scope.heading = focus.data.title;
    $scope.currentState = focus.name;
    var index = order.indexOf(focus.name);
    $scope.progress = Math.max(.05, (index / (order.length-1))) * 100 + '%';
  };
  updateRelationals($state.current);

  // Checks a specific query object for completeness. Returns a boolean.
  function checkQueryComplete(query) {
    console.log('checking individual query');
    console.log(query);
    return true;
  };

  // TODO: Check if questions are complete to determine enabled sections.
  // Checks each query object in the current queries object for completeness. Returns boolean.
  $scope.checkQueriesComplete = function(queries) {
    console.log('\nIn checkQueriesComplete:');
    var currentQueries = queries;
    if (!!currentQueries) {
      for (var i=0, n=currentQueries.length; i<n; i++) {
        queries[i].isComplete = checkQueryComplete(currentQueries[i]);
      }
    }
  };
  // $scope.checkQueriesComplete();

  // Returns true if current section is valid, else false.
  $scope.isValid = function() {
    return $('.ng-invalid:visible').length === 0;
  };

  var queries, index;
  // Move to previous accordion group or section.
  $scope.gotoprevious = function() {
    queries = $scope.$$childHead.queries;
    index = order.indexOf($state.current.name);
    if (!queries || !!queries[0].isOpen) {
      $state.go(order[index-1]);
    } else {
      var i = queries.length-1;
      while (!queries[i].isOpen) {
        i--;
        // Edge case: if all sections are closed.
        if (i < 0) {
          return $state.go(order[index-1]);
        }
      }
      queries[i].isOpen = false;
      queries[i-1].isOpen = true;
    }
  };

  // Move to next required input field, accordion group or section.
  $scope.gotonext = function() {
    // If there is an empty required field, set focus to that input section and display popover.
    if (!$scope.isValid()) {
      $('.ng-invalid:visible').first().focus();
      return;
    }

    // If all required query sections are filled in, move to the next plan-builder section.
    queries = $scope.$$childHead.queries;
    index = order.indexOf($state.current.name);
    if (!queries || !!queries[queries.length-1].isOpen) {
      return $state.go(order[index+1]);
    }

    // If user is on the final input, move to the next accordion section.
    else {
      var i = 0;
      while (!queries[i].isOpen) {
        i++;
        // Edge case: if all sections are closed.
        if (i >= queries.length) {
          return $state.go(order[index+1]);
        }
      }
      queries[i].isComplete = true;
      queries[i].isOpen = false;
      queries[i+1].isEnabled = true;
      queries[i+1].isOpen = true;
    }
    $scope.isValid();
  };

  // Update page heading and navbar on state change within plan-builder.
  // From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
  $scope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      if (order.indexOf(toState.name) >= 0) {
        updateRelationals(toState);
      }
    }
  );

  // TODO: Save all changes on form inputs.
  // For now, this is being used for testing purposes.
  $scope.save = function(route) {
    console.log('inside $scope.save()');

    console.log('$scope.user.plan');
    console.log($scope.user.plan);

    // $scope.testBinding();
  };

  // **********************************************************************************************
  // THE FOLLOWING IS NOT CURRENTLY FUNCTIONING PROPERLY. TODO: Fix binding for question directive.
  // **********************************************************************************************
  // Function to pass to directives that maintains closure access to $scope.user.plan.
  // In the HTML this would be used like: <div ng-model="setBinding('[PROPERTY]')"></div>
  var binding = $scope.user;
  $scope.setBinding = function(target) {
    // If binding is a single property on the user, then simply apply it.
    var path = target.split('.');
    if (path.length === 0) return binding[target];

    // To set the binding for nested objects, accepts an array as a parameter.
    var setNestedBinding = function(path) {
      // If target group doesn't exist, create it as an empty object.
      if (!binding[path[0]]) binding[path[0]] = {};
      binding = binding[path.shift()];
      if (path.length > 0) setNestedBinding(path);
    };
    setNestedBinding(path);

    return binding;
  };

  // This currently successfully adds a new credit card to the plan.
  $scope.testBinding = function() {
    console.log($scope.user);
    var temp = $scope.setBinding('plan.debts.creditCards');

    console.log('$scope.user.plan.debts.creditCards');
    console.log($scope.user.plan.debts.creditCards);
    console.log('');

    console.log('temp');
    console.log(temp);
    console.log('');

    // Push to $scope.user.plan.debts.creditCards
    $scope.user.plan.debts.creditCards.push({ name: 'VISA', rate: 10.99, amount: 5000 });

    // Relog
    console.log('$scope.user.plan.debts.creditCards after new card was added');
    console.log($scope.user.plan.debts.creditCards);
    console.log('');

    console.log('temp after new card added');
    console.log(temp);
    console.log('');
  };

});
