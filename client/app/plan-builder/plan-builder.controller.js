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
    var index = order.indexOf(focus.name);
    // ui-router does not currently support dynamic sref: https://github.com/angular-ui/ui-router/issues/1208
    // $scope.previous = order[index - 1] ? order[index - 1].replace('.', '/') : false;
    // $scope.next = order[index + 1] ? order[index + 1].replace('.', '/') : false;
    $scope.progress = Math.max(.05, (index / order.length - 1)) * 100 + '%';
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

  // Move to next accordion group or section.
  $scope.next = function() {
    queries = $scope.$$childHead.queries;
    index = order.indexOf($state.current.name);
    if (!queries || !!queries[queries.length-1].isOpen) {
      $state.go(order[index+1]);
    } else {
      var i = 0;
      while (!queries[i].isOpen) {
        i++;
        // Edge case: if all sections are closed.
        if (i >= queries.length) {
          return $state.go(order[index+1]);
        }
      }
      queries[i+1].isOpen = true;
      queries[i].isOpen = false;
    }

  };

  // Update page heading and navbar on state change within plan-builder.
  // From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
  $scope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (order.indexOf(toState.name) >= 0) updateRelationals(toState);
    }
  );

  // Save all changes on form inputs.
  $scope.save = function(route) {
    console.log('saving');
  };

});
