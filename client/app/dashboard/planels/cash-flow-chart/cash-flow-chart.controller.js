(function () {
  'use strict';

  angular.module('prosperenceApp.planel.cashFlowChart', [])
  .controller('CashFlowChartCtrl', function (Auth, DashboardService) {
    var user = Auth.getCurrentUser();
    var plan = user.plan;
    var expenses = user.plan.expenses;

    // Cash Flow Chart Logic
    var fixedExpenses = DashboardService.sumGroup(expenses.fixed);
    var flexibleExpenses = DashboardService.sumGroup(expenses.flexible);
    // Build savings data
    var savingsData = [];
    var temp;
    for (var key in plan.contributions) {
      if (key === 'reserves') temp = 'Emergency Reserves';
      else if (key === 'earlyRetirement') temp = 'Early Retirement';
      else temp = 'Retirement';
      savingsData.push({
        name: temp,
        amount: DashboardService.sumGroup(plan.contributions[key])
      });
    }
    var savings = DashboardService.sumGroup(savingsData);
    var totalCashFlowOut = fixedExpenses + flexibleExpenses + savings;

    // http://www.highcharts.com/demo/pie-drilldown
    var topLevelSlices = {
      'Fixed Expenses': null,
      'Flexible Expenses': null,
      'Savings': null
    };

    var sliceData = [{
      drilldown: 'Fixed Expenses',
      name: 'Fixed Expenses',
      visible: true,
      y: (fixedExpenses / totalCashFlowOut) * 100
    }, {
      drilldown: 'Flexible Expenses',
      name: 'Flexible Expenses',
      visible: true,
      y: (flexibleExpenses / totalCashFlowOut) * 100
    }, {
      drilldown: 'Savings',
      name: 'Long-Term Savings',
      visible: true,
      y: (savings / totalCashFlowOut) * 100
    }, {
      drilldown: null,
      name: 'Unallocated Income',
      visible: true,
      y: (plan.taxProjection.netIncome / 12) / 100
    }];

    // console.log(sliceData)
    var drillDownSlices = [{
      name: 'Fixed Expenses',
      id: 'Fixed Expenses',
      data: DashboardService.buildHighchartData(expenses.fixed)
    }, {
      name: 'Flexible Expenses',
      id: 'Flexible Expenses',
      data: DashboardService.buildHighchartData(expenses.flexible)
    }, {
      name: 'Savings',
      id: 'Savings',
      data: DashboardService.buildHighchartData(savingsData)
    }];

    // Create the chart
    var cashFlowChart = $('#cash-flow-chart').highcharts({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Cashflow Analysis'
      },
      subtitle: {
        text: 'click on a section to see a detailed breakdown'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            distance: 5,
            style: {
              'text-decoration': 'none'
            }
          }
        }
      },
      tooltip: {
        enabled: true,
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: 'top',
        colorByPoint: true,
        data: sliceData
      }],
      drilldown: {
        series: drillDownSlices
      }
    });
    // hide highcharts.com logo
    $('text[text-anchor=end]').hide();
    // End cash flow pie chart.

  });

})();
