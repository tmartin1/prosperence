'use strict';

angular.module('prosperenceApp')
.controller('NetWorthCtrl', function ($scope) {
  $scope.plan = $scope.user.plan;

  // Calculates and return the total of a given group.
  var sumGroup = function(group) {
    var total = 0;
    for (var key in group) {
      if (typeof group[key] === 'number') total += group[key];
      else total += group[key]['amount'];
    }
    return total;
  }

  // Net Worth Chart Logic
  // http://www.highcharts.com/demo/pie-drilldown
  var fixedAssets = sumGroup($scope.plan.assets.fixed);
  var variableAssets = sumGroup($scope.plan.assets.variable);
  var personalAssets = sumGroup($scope.plan.assets.personal);
  var mortgages = $scope.plan.mortgage.currentBalance;
  var studentLoans = sumGroup($scope.plan.debts.studentLoans);
  var creditCards = sumGroup($scope.plan.debts.creditCards);
  var otherDebts = sumGroup($scope.plan.debts.other);

  // Create the chart
  $('#netWorthContainer').highcharts({
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
