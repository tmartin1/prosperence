'use strict';

angular.module('prosperenceApp')
.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {
  $scope.previous, $scope.next;
  $scope.isCollapsed = true;
  $scope.getCurrentUser = Auth.getCurrentUser;

  // Defines the order of how pages are displayed to the user.
  var order = [
    'plan-builder.start',
    'plan-builder.basic',
    'plan-builder.nws',
    'plan-builder.tax',
    'plan-builder.msa',
    'plan-builder.risk',
    'plan-builder.retire'
  ];

  // Sets the title, progress bar, and the 'previous' and 'next' links.
  var updateRelationals = function(focus) {
    $scope.heading = focus.data.title;
    var index = order.indexOf(focus.name);
    // ui-router does not currently support dynamic sref: https://github.com/angular-ui/ui-router/issues/1208
    $scope.previous = order[index - 1] ? order[index - 1].replace('.', '/') : false;
    $scope.next = order[index + 1] ? order[index + 1].replace('.', '/') : false;
    $scope.progress = Math.max(.05, (index / order.length - 1)) * 100 + '%';
  };
  updateRelationals($state.current);

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
