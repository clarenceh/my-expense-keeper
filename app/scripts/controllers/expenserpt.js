'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenserptCtrl', function ($scope, $http, $location, $log, $filter) {

        $scope.rptCriteria = {};

        $scope.groupByOptions = ['Category', 'Location'];

        // Default group by option
        $scope.rptCriteria.groupBy = 'Category';

        // Default date range
        $scope.rptCriteria.toDate = $filter('date')(new Date(), 'yyyy-MM-dd');

        var fromDate = new Date();
        fromDate = fromDate.setDate(fromDate.getDate() - 30);
        fromDate = new Date(fromDate);
        $scope.rptCriteria.fromDate = $filter('date')(fromDate, 'yyyy-MM-dd');

        $scope.showRpt = false;
        $scope.reportData = {};

        $scope.cancel = function() {
            $location.path('/expenselist');
        }

        $scope.renderRpt = function() {

            // Retrieve data from server for display report
            $log.info('Report options: from date: ' + $scope.rptCriteria.fromDate + ' to date: ' + $scope.rptCriteria.toDate + ' group by: ' + $scope.rptCriteria.groupBy);

            $http.post('/api/expenserpt', $scope.rptCriteria).success(function(data, status) {
                $log.info('Expense report data: ' + data);
                $scope.reportData = data;
            }).error(function(data, status) {
                $log.info('Error retrieving expense report data: ' + status);
            });

            $scope.showRpt = true;
        }

  });
