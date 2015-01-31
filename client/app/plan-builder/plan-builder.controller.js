'use strict';

angular.module('prosperenceApp')
	.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {
		$scope.heading, $scope.previous, $scope.next;
		$scope.isCollapsed = true;
		$scope.getCurrentUser = Auth.getCurrentUser;

		// Defines the order of how pages are displayed to the user.
		var order = [
			'plan-builder.start',
			'plan-builder.nws',
			'plan-builder.tax',
			'plan-builder.msa',
			'plan-builder.risk',
			'plan-builder.retire'
		];

		$scope.heading = $state.current.data.title; // Set the title
		var current = order.indexOf($state.current.name);
		$scope.previous = order[current - 1];
		$scope.next = order[current + 1];


		// Update page heading and navbar on state change.
		// From docs: https://github.com/angular-ui/ui-router/wiki#wiki-state-change-events
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				event.preventDefault();
				// $scope.heading = $state.current.data.title; // Update the title
				// $scope.heading = states[$state.current.url].title; // Set the title
				// Update the nav and progress bars
			}
		);

		// Save all changes from form inputs.
		$scope.save = function(route) {
			console.log('saving');
			console.log($scope.heading);
			current = Math.max(0, order.indexOf($state.current.url.replace('/', '.')));
			console.log(current);
			// current = Math.max(0, order.indexOf($state.current.url));
			// $scope.previous = order[current - 1] || false;
			// $scope.next = order[current + 1] || false;
			// $scope.progress = Math.max(.05, (current / order.length)) * 100 + '%';
		};

	});
