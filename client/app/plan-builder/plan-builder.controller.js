'use strict';

angular.module('prosperenceApp')
.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {
  $scope.isCollapsed = true;

  $scope.user = Auth.getCurrentUser() || {};
  $scope.user.personal = $scope.user.personal || {};
  $scope.user.plan = $scope.user.plan || {};

  // List of states for location questions.
  $scope.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
    'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV',
    'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA',
    'VT', 'WA', 'WI', 'WV', 'WY'];

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
  var updateRelationals = function(focus) {
    $scope.heading = focus.data.title;
    $scope.currentState = focus.name;
    var index = order.indexOf(focus.name);
    $scope.progress = Math.max(.05, (index / (order.length-1))) * 100 + '%';
  };
  updateRelationals($state.current);

  var queries, index;

  // Move to previous accordion group or section.
  $scope.previous = function() {
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
  $scope.next = function() {
    // If there is an empty required field, set focus to that input section and display popover.
    // find the first invalid element
    var firstInvalid = $('.ng-invalid:visible').first();
    // var firstInvalid = angular.element(elem[0].querySelector('.ng-invalid'))[0];
    console.log(firstInvalid);
    // if we find one, set focus
    if (firstInvalid.length > 0) {
      return firstInvalid.focus();
    }

    // var textboxes = $('input:visible');
    // var currentBox;
    // if ($('input:focus').length > 0) {
    //   currentBox = $('input:focus');
    // }
    // var currentIndex = textboxes.index(currentBox);
    //
    // // If there is another input fields, move focus to that field.
    // if (textboxes[currentIndex + 1] !== undefined) {
    //   console.log('advancing to next input');
    //   var nextBox = textboxes[currentIndex + 1];
    //   nextBox.focus();
    //   return nextBox.select();
    // }

    // If all required sections are filled in, then move to the next section.
    queries = $scope.$$childHead.queries;
    index = order.indexOf($state.current.name);
    if (!queries || !!queries[queries.length-1].isOpen) {
      return $state.go(order[index+1]);
    }

    // If user is on the final section, move to the next accordion section.
    else {
      var i = 0;
      while (!queries[i].isOpen) {
        i++;
        // Edge case: if all sections are closed.
        if (i >= queries.length) {
          return $state.go(order[index+1]);
        }
      }
      queries[i+1].isOpen = true;
      queries[i+1].isEnabled = true;
      queries[i].isOpen = false;
      queries[i].isComplete = true;
    }
  };

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

  // Update page heading and navbar on state change within plan-builder.
  // From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (order.indexOf(toState.name) >= 0) updateRelationals(toState);
    }
  );

  // TODO: Save all changes on form inputs.
  // for now, this is being used for testing purposes.
  $scope.save = function(route) {
    console.log($scope.user.plan);
    console.log($scope.currentState);
    // $scope.testBinding();
    console.log('saving');
  };

});
