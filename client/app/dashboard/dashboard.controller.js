'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope, $state, CalcsService, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;
  $scope.defaultOverviewPlanels = [];


  // Returns the full path of the input within ./dashboard/.
  $scope.getPath = function(localPath) {
    return 'app/dashboard/' + localPath;
  }

  // Calculates and return the total of a given group.
  $scope.sumGroup = function(group) {
    var total = 0;
    for (var key in group) {
      if (typeof group[key] === 'number') total += group[key];
      else total += group[key]['amount'];
    }
    return total;
  };

  // Builds an array of data for Highcharts from a plan group.
  $scope.buildHighchartData = function(obj) {
    var data = [];
    for (var key in obj) {
      data.push({ name:obj[key]['name'] || key, y:obj[key]['amount'] });
    }
    return data;
  };

  // Add planel to overview.
  $scope.addPlanel = function(planel) {
    if (!$scope.user.overviewPlanels[planel.selector]) {
      $scope.user.overviewPlanels[planel.userOptions.title.text] = planel.renderTo;
    }
    console.log(planel.renderTo);
  };

  // Remove planel from overview.
  $scope.removePlanel = function(planel) {
    // If state = overview, Remove element from DOM
    if ($state.current.name === 'dashboard.overview') {
      $('#' + planel.renderTo.id).remove();
    }
    // Remove element from overviewPlanels object.
    delete $scope.user.overviewPlanels[planel.userOptions.title.text];
  };

  // If overview is undefined, then load default planels.
  $scope.resetDefaultOverview = function() {
    $scope.user.overviewPlanels = {};
    for (var key in $scope.defaultOverviewPlanels) {
      $scope.user.overviewPlanels[$scope.defaultOverviewPlanels[key].title.text] = $scope.user.overviewPlanels[$scope.defaultOverviewPlanels[key]];
    }
  };
  if (!$scope.user.overviewPlanels) $scope.resetDefaultOverview();

  // Defines initial view conditions for my-plan and settings.
  $scope.myPlanView = $scope.myPlanView || $scope.getPath('my-plan/net-worth/net-worth.html');
  $scope.settingsView = $scope.settingsView || $scope.getPath('settings/basic/basic.html');

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
  // TODO: Update this for ng-include refactor
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
