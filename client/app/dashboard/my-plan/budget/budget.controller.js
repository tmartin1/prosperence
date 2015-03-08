'use strict';

angular.module('prosperenceApp')
.controller('BudgetCtrl', function ($scope, Auth) {

  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;

  var expenses = $scope.plan.expenses;

  var buildData = function(obj) {
    var data = [];
    for (var key in obj) {
      data.push({ name:obj[key]['name'] || key, y:obj[key]['amount'] });
    }
    return data;
  };

  // Calculates and return the total of a given group.
  var sumGroup = function(group) {
    var total = 0;
    for (var key in group) {
      if (typeof group[key] === 'number') total += group[key];
      else total += group[key]['value'] || group[key]['balance'];
    }
    return total;
  }

  // Cash Flow Chart Logic
  var fixedExpenses = $scope.sumGroup(expenses.fixed);
  var flexibleExpenses = $scope.sumGroup(expenses.flexible);
  var savings = $scope.sumGroup($scope.plan.contributions);
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
  }];
  var drillDownSlices = [{
    name: 'Fixed Expenses',
    id: 'Fixed Expenses',
    data: buildData(expenses.fixed)
  }, {
    name: 'Flexible Expenses',
    id: 'Flexible Expenses',
    data: buildData(expenses.flexible)
  }, {
    name: 'Long-Term Savings',
    id: 'Savings',
    data: buildData($scope.plan.contributions)
  }];

  // Create the chart
  var cashFlowChart = $('#cashFlowAnalysisContainer').highcharts({
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
          format: '{point.name}'
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


  // Tax Chart Logic
  // Build the chart
  $('#taxContainer').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Income Tax Analysis'
    },
    subtitle: {
      text: 'click any asset or debt in the legend to add or remove it from the graph'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true
        },
        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      data: [
        [ 'Federal', $scope.plan.taxProjection.projected.federal ],
        [ 'State and City', $scope.plan.taxProjection.projected.local ],
        [ 'FICA', sumGroup($scope.plan.taxProjection.projected.fica) ],
        [ 'AMT', $scope.plan.taxProjection.projected.amt ],
        [ 'Net Income', $scope.plan.taxProjection.netIncome + savings ]
      ]
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();

});
