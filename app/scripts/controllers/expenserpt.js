'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenserptCtrl', function ($scope, $http, $location, $log) {

        $scope.rptCriteria = {};

        $scope.groupByOptions = ['Category', 'Location'];

        $scope.showRpt = false;

        $scope.cancel = function() {
            $location.path('/expenselist');
        }

        $scope.renderRpt = function() {

            // Retrieve data from server for display report
            $log.info('Report options: from date: ' + $scope.rptCriteria.fromDate + ' to date: ' + $scope.rptCriteria.toDate + ' group by: ' + $scope.rptCriteria.groupBy);

            $http.post('/api/expenserpt', $scope.rptCriteria).success(function(data, status) {
                $log.info('Expense report data: ' + data);
            }).error(function(data, status) {
                $log.info('Error retrieving expense report data: ' + status);
            });

            $scope.showRpt = true;
        }

  });
