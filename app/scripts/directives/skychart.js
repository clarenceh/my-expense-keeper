'use strict';

angular.module('myExpenseKeeperApp')
  .directive('skyChart', function () {
    return {
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
/*          element.highcharts({
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false
              },
              title: {
                  text: 'My Expense Report'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          color: '#000000',
                          connectorColor: '#000000',
                          formatter: function() {
                              return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                          }
                      },
                      tooltip: {
                          pointFormat: '{series.name}: <b>{point.x}</b>',
                          valueDecimals: 1
                      }
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Money spent',
                  data: [
                      {name: 'Computer', x: 200, y: 200},
                      {name: 'Food', x: 100 , y: 100}
                  ]
              }]
          });*/

          var chart = new Highcharts.Chart({
              chart: {
                  renderTo: 'chart',
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false
              },
              title: {
                  text: 'My Expense Report'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          color: '#000000',
                          connectorColor: '#000000',
                          formatter: function() {
                              return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                          }
                      },
                      tooltip: {
                          pointFormat: '{series.name}: <b>{point.x}</b>',
                          valueDecimals: 1
                      }
                  }
              }
          });
      }
    };
  });
