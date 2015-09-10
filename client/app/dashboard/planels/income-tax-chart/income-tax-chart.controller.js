(function () {
  'use strict';

  angular.module('prosperenceApp.planel.incomeTaxChart', [])
  .controller('IncomeTaxChartCtrl', function (Auth, DashboardService) {
    // Tax Chart Logic
    var user = Auth.getCurrentUser();

    // Build savings data
    var savingsData = [];
    for (var key in user.plan.contributions) {
      var temp;
      if (key === 'reserves') temp = 'Emergency Reserves';
      else if (key === 'earlyRetirement') temp = 'Early Retirement';
      else temp = 'Retirement';
      savingsData.push({
        name: temp,
        amount: DashboardService.sumGroup(user.plan.contributions[key])
      });
    }

    var savings = DashboardService.sumGroup(savingsData);

    // Build the chart
    var taxBreakdownChart = $('#income-tax-chart').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Income Tax Analysis'
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: 5,
            enabled: true
          },
          showInLegend: true
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        type: 'pie',
        data: [
          [ 'Federal', user.plan.taxProjection.projected.federal ],
          [ 'State and City', user.plan.taxProjection.projected.local ],
          [ 'FICA', DashboardService.sumGroup(user.plan.taxProjection.projected.fica) ],
          [ 'AMT', user.plan.taxProjection.projected.amt ],
          [ 'Net Income', user.plan.taxProjection.netIncome + savings ]
        ]
      }]
    });
    // hide highcharts.com logo
    $('text[text-anchor=end]').hide();

  });

})();
