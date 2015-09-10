// TODO: Seaparate appropriate services into PlanelService or HighchartsService.
(function () {
  'use strict';

  angular.module('prosperenceApp.service.dashboard', [])
  .factory('DashboardService', function ($state, Auth) {
    var user = Auth.getCurrentUser();

    // Default dashboard planels.
    var defaultOverviewPlanels = [
      'cash-flow-chart',
      'net-worth-over-time-chart',
      'debt-balance-over-time-chart',
      'income-tax-chart'
    ];

    var overview = user.overviewPlanels || defaultOverviewPlanels;

    var planelLibrary = {
      'cash-flow-chart': getPlanelPath('cash-flow-chart'),
      'debt-balance-over-time-chart': getPlanelPath('debt-balance-over-time-chart'),
      'debt-reduction-chart': getPlanelPath('debt-reduction-chart'),
      'income-tax-chart': getPlanelPath('income-tax-chart'),
      'net-worth-chart': getPlanelPath('net-worth-chart'),
      'retirement-savings-growth-chart': getPlanelPath('retirement-savings-growth-chart'),
      'net-worth-over-time-chart': getPlanelPath('net-worth-over-time-chart')
    };

    // Normalizes a given input number to an approximate monthly frequency.
    var normalizeMonthly = {
      'Weekly': function (num) {
        return ( num * 52 / 12 );
      },
      'Monthly': function (num) {
        return num;
      },
      'Semi-Annually': function (num) {
        return ( num * 2 / 12 );
      },
      'Annually': function (num) {
        return ( num / 12 );
      }
    };

    var currentView = overview; // default dashboard view.

    // Allow user to drag and drop the planels to customize the overview.
    var organizable = false;

    return {
      currentState: currentState,
      currentView: currentView,
      getPath: getPath,
      getPlanelPath: getPlanelPath,
      defaultOverviewPlanels: defaultOverviewPlanels,
      addPlanel: addPlanel,
      removePlanel: removePlanel,
      planelLibrary: planelLibrary,
      updateChartMenu: updateChartMenu,
      sumGroup: sumGroup,
      buildHighchartData: buildHighchartData,
      updateCurrentView: updateCurrentView,
      resetDefaultOverviewPlanels: resetDefaultOverviewPlanels,
      toggleOrganizability: toggleOrganizability
    };

    // Reset overview planels to defaults.
    function resetDefaultOverviewPlanels () {
      vm.user.overviewPlanels = defaultOverviewPlanels.slice();
    };

    // TODO: Toggle ability to reorganize overview planels.
    function toggleOrganizability () {
      organizable = !organizable;
    };

    function updateCurrentView (newView) {
      currentView = newView;
    }

    /*
     *  Overview defaults and helper functions.
    */

    // Return name of current state.
    function currentState () {
      return $state.current.name;
    }

    // Returns the full path of the input within ./dashboard/.
    function getPath (localPath) {
      return 'app/dashboard/' + localPath;
    }

    // Returns the full path of the target planel.
    function getPlanelPath (target) {
      return getPath('planels/' + target + '/' + target + '.html');
    }

    /*
     *  Planel/Overview logic and methods.
    */

    // Add planel to overview.
    function addPlanel (planel) {
      if (user.overviewPlanels.indexOf(planel) === -1) {
        user.overviewPlanels.push(planel);
        // TODO: User service to add panel to overviewPanels.
      }
    }

    // Remove planel from overview.
    function removePlanel (planel) {
      var index = user.overviewPlanels.indexOf(planel);
      if (index !== -1) {
        user.overviewPlanels.splice(index, 1);
        // vm.$apply();
      }
    }

    function updateChartMenu () {
      if (Highcharts.getOptions().exporting.buttons.contextButton.menuItems[0].text !== 'Add to Overview') {
        Highcharts.getOptions().exporting.buttons.contextButton.menuItems.shift();
        Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
          text: 'Remove from Overview',
          onclick: function () {
            vm.removePlanel(this.renderTo.id)
          }
        });
        Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
          text: 'Add to Overview',
          onclick: function () {
            vm.addPlanel(this.renderTo.id)
          }
        });
      }
    }

    // Calculate and return the total of a given group.
    function sumGroup (group) {
      var total = 0;
      for (var key in group) {
        if (typeof group[key] === 'number') {
          total += group[key];
        } else if (!!normalizeMonthly[group[key]['frequency']]) {
          total += normalizeMonthly[group[key]['frequency']](group[key]['amount']);
        } else {
          total += group[key]['amount'];
        }
      }
      return total;
    }

    // Builds an array of data for Highcharts from a plan group.
    function buildHighchartData (obj) {
      var data = [];
      for (var key in obj) {
        data.push({
          name: obj[key]['name'] || key,
          y: obj[key]['amount']
        });
      }
      return data;
    }

  });

})();
