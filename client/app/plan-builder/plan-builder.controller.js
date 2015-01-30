'use strict';

angular.module('prosperenceApp')
	.controller('PlanBuilderCtrl', function($scope, $location, Auth) {
		// Defines the order of how pages are displayed to the user.
		var order = [
			'/nws',
			'/tax',
			'/msa',
			'/risk',
			'/retire'
		];

		// Plan navbar and progress bar.
		var current = Math.max(0, order.indexOf($location.path()));
		$scope.previous = order[current - 1] || false;
		$scope.next = order[current + 1] || false;
		$scope.progress = Math.max(.05, (current / order.length)) * 100 + '%';

		$scope.isCollapsed = true;
		$scope.getCurrentUser = Auth.getCurrentUser;

		// Save all changes from form inputs.
		$scope.save = function(route) {
			console.log('saving');
		};

	});
