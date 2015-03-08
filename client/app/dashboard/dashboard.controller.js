'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope, $state, CalcsService, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;
  // $scope.planelLibrary = $scope.planelLibrary || {};
  $scope.user.overviewPlanels = $scope.user.overviewPlanels || {};

  // Calculates and return the total of a given group.
  $scope.sumGroup = function(group) {
    var total = 0;
    for (var key in group) {
      if (typeof group[key] === 'number') total += group[key];
      else total += group[key]['amount'];
    }
    return total;
  };

  // Add planel to overview.
  $scope.addPlanel = function(planel) {
    if (!$scope.user.overviewPlanels[planel.selector]) {
      $scope.user.overviewPlanels[planel.userOptions.title.text] = planel.renderTo;
    }
  };

  // Remove planel from overview.
  $scope.removePlanel = function(planel) {
    // $scope.user.overviewPlanels[planel.userOptions.title.text] = undefined;
    delete $scope.user.overviewPlanels[planel.userOptions.title.text];
  };

  // If overview is undefined, then load default planels.
  // if (!$scope.user.overviewPlanels) {
  //   $scope.user.overviewPlanels = {};
  //   $scope.addPlanel($scope.planelLibrary['#cashFlowAnalysisContainer']);
  // }

  // Defines initial view conditions for my-plan and settings.
  $scope.myPlanView = $scope.myPlanView || getPath('my-plan/net-worth/net-worth.html');
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
      view: getPath('my-plan/net-worth/net-worth.html'),
      active: true
    }, {
      title: 'Budget',
      view: getPath('my-plan/budget/budget.html')
    }, {
      title: 'Insurance',
      view: getPath('my-plan/insurance/insurance.html')
    }, {
      title: 'Retirement',
      view: getPath('my-plan/retire/retire.html')
    }, {
      title: 'Add More',
      view: getPath('my-plan/more/more.html')
    }]
  }, {
    title: 'Progress',
    link: 'dashboard.progress',
    icon: ''
  }, {
    title: 'My University',
    link: 'dashboard.university',
    icon: ''
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
      view: getPath('settings/notifications/notifications.html')
    }, {
      title: 'Security',
      view: getPath('settings/security/security.html')
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

  // Update the chart menu with add/remove from overview options.
  $scope.updateChartMenu = function() {
    if (Highcharts.getOptions().exporting.buttons.contextButton.menuItems[0].text !== 'Add to Overview') {
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.shift();
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
        text: 'Remove from Overview',
        onclick: function() { $scope.removePlanel(this) }
      });
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
        text: 'Add to Overview',
        onclick: function() { $scope.addPlanel(this) }
      });
    }
  };
  $scope.updateChartMenu();

});
