'use strict';

angular.module('myExpenseKeeperApp')
    .directive('skyChart', function ($log) {
        //noinspection JSHint,JSHint,JSHint
        return {
            restrict: 'AE',
            link: function postLink(scope, element, attrs) {

                //noinspection JSHint
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
                                formatter: function () {
                                    //noinspection JSHint
                                    return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + ' %';
                                }
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.x}</b>',
                                valueDecimals: 1
                            }
                        }
                    }
                });

                var seriesOpts = {
                    type: 'pie',
                    name: 'Money spent'
                };

                var reportData = {};

                // Watch the report data
                scope.$watch('reportData', function () {
                    $log.info('Report data was changed, render chart data');

                    reportData = [];

                    //noinspection JSHint
                    angular.forEach(scope.reportData, function (value, key) {
                        $log.info('Id: ' + value._id + ' total: ' + value.total);
                        reportData.push({name: value._id, x: value.total, y: value.total});
                    });

                    seriesOpts.data = reportData;

                    // Remove all the existing series
                    if (chart.series.length) {
                        chart.series[0].remove();
                    }

                    chart.addSeries(seriesOpts);

                });
            }
        };
    });
