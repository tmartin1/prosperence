'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope, $state) {

  // Sidebar information.
  $scope.sidebar = [{
    title: 'Overview',
    link: 'dashboard.overview',
    icon: ''
  }, {
    title: 'My Plan',
    link: 'dashboard.my-plan',
    icon: '',
    submenu: [{
      title: 'Net Worth',
      view: getPath('/nws/nws.html'),
      active: true
    }, {
      title: 'Budget',
      view: getPath('/msa/msa.html'),
      active: false
    }, {
      title: 'Insurance',
      view: getPath('/insurance/insurance.html'),
      active: false
    }, {
      title: 'Retirement',
      view: getPath('/retire/retire.html'),
      active: false
    }, {
      title: 'Add More',
      view: getPath('/more/more.html'),
      active: false
    }]
  }, {
    title: 'Settings',
    link: 'dashboard.settings',
    icon: 'glyphicon glyphicon-cog'
  }];

  // Returns the full path of the input within ./dashboard/my-plan.
  function getPath(localPath) {
    return 'app/dashboard/my-plan' + localPath;
  }

  // Sets visibility of submenus in the sidebar.
  $scope.showSubmenu = function(selected) {
    // Reset all submenus to not visible.
    for (var i=0; i<$scope.sidebar.length; i++) {
      if ($scope.sidebar[i].submenu) {
        $scope.sidebar[i].submenu.visible = false;
      }
    }
    // Set selected sidebar submenu to visible.
    if (selected.submenu) {
      selected.submenu.visible = true;
    }
  };

  // Check and set submenu viewability on load/state enter.
  for (var i=0; i<$scope.sidebar.length; i++) {
    if ($state.current.name === $scope.sidebar[i].link && $scope.sidebar[i].submenu) {
      $scope.sidebar[i].submenu.visible = true;
    }
  }

  // Sets the current view for my-plan.
  $scope.setPlanView = function(sub, submenu) {
    if (!sub) {
      getPath('/nws/nws.html');
    } else {
      for (var i=0; i<submenu.length; i++) {
        submenu[i].active = false;
      }
      $scope.myPlanView = sub.view;
      sub.active = true;
    }
  };
  $scope.setPlanView();


});
