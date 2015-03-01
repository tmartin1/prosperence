'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope, $state) {
  // Defines initial view conditions for my-plan and settings.
  $scope.myPlanView = $scope.myPlanView || getPath('my-plan/nws/nws.html');
  $scope.settingsView = $scope.settingsView || getPath('settings/basic/basic.html');

  // Sidebar information.
  $scope.sidebar = [{
    title: 'Overview',
    link: 'dashboard.overview',
    icon: ''
  }, {
    title: 'My Plan',
    link: 'dashboard.my-plan',
    icon: '',
    setView: 'myPlanView',
    submenu: [{
      title: 'Net Worth',
      view: getPath('my-plan/nws/nws.html'),
      active: true
    }, {
      title: 'Budget',
      view: getPath('my-plan/msa/msa.html'),
      active: false
    }, {
      title: 'Insurance',
      view: getPath('my-plan/insurance/insurance.html'),
      active: false
    }, {
      title: 'Retirement',
      view: getPath('my-plan/retire/retire.html'),
      active: false
    }, {
      title: 'Add More',
      view: getPath('my-plan/more/more.html'),
      active: false
    }]
  }, {
    title: 'Settings',
    link: 'dashboard.settings',
    icon: 'glyphicon glyphicon-cog',
    setView: 'settingsView',
    submenu: [{
      title: 'Basic',
      view: getPath('settings/basic/basic.html'),
      active: true
    }, {
      title: 'Notifications',
      view: getPath('settings/notifications/notifications.html'),
      active: false
    }, {
      title: 'Security',
      view: getPath('settings/security/security.html'),
      active: false
    }]
  }];
  
  // Check and set submenu viewability on load/state enter.
  for (var i=0; i<$scope.sidebar.length; i++) {
    if ($state.current.name === $scope.sidebar[i].link && $scope.sidebar[i].submenu) {
      $scope.sidebar[i].submenu.visible = true;
    }
  }

  // Returns the full path of the input within ./dashboard/.
  function getPath(localPath) {
    return 'app/dashboard/' + localPath;
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
    if (!!selected && selected.submenu) {
      selected.submenu.visible = true;
    }
  };

  // Sets the current view for my-plan.
  $scope.setSubView = function(sub, submenu, section) {
    for (var i=0; i<submenu.length; i++) {
      submenu[i].active = false;
    }
    sub.active = true;
    $scope[section.setView] = sub.view;
  };

});
