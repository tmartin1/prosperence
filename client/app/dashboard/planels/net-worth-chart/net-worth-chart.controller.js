(function () {
  'use strict';

  angular.module('prosperenceApp.planel.netWorthChart', [])
  .controller('NetWorthChartCtrl', function (Auth, DashboardService) {
    var user = Auth.getCurrentUser();

    // Net Worth Chart Logic
    // http://www.highcharts.com/demo/pie-drilldown
    var fixedAssets = DashboardService.sumGroup(user.plan.assets.fixed);
    var variableAssets = DashboardService.sumGroup(user.plan.assets.variable);
    var personalAssets = DashboardService.sumGroup(user.plan.assets.personal);
    var mortgages = user.plan.mortgage.currentBalance;
    var studentLoans = DashboardService.sumGroup(user.plan.debts.studentLoans);
    var creditCards = DashboardService.sumGroup(user.plan.debts.creditCards);
    var otherDebts = DashboardService.sumGroup(user.plan.debts.other);

    // Create the chart
    $('#net-worth-chart').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Net Worth Snapshot'
      },
      subtitle: {
        text: 'click any asset or debt in the legend to add or remove it from the graph'
      },
      xAxis: {
        categories: [ 'Assets', 'Debts' ]
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Amount'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Fixed Assets',
        data: [ fixedAssets, 0 ]
      }, {
        name: 'Variable Assets',
        data: [ variableAssets, 0 ]
      }, {
        name: 'Personal Assets',
        data: [ personalAssets, 0 ]
      }, {
        name: 'Mortgage',
        data: [ 0, mortgages ]
      }, {
        name: 'Student Loans',
        data: [ 0, studentLoans ]
      }, {
        name: 'Credit Cards',
        data: [ 0, creditCards ]
      }, {
        name: 'Other Debt',
        data: [ 0, otherDebts ]
      }]
    });
    // hide highcharts.com logo
    $('text[text-anchor=end]').hide();

  });

})();
