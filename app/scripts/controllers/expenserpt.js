'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenserptCtrl', function ($scope, $location, $log) {

        $scope.rptCriteria = {};

        $scope.groupByOptions = ['Category', 'Location'];

        $scope.showRpt = false;

        $scope.cancel = function() {
            $location.path('/expenselist');
        }

        $scope.renderRpt = function() {

            // Retrieve data from server for display report
            $log.info('Report options: from date: ' + $scope.rptCriteria.fromDate + ' to date: ' + $scope.rptCriteria.toDate + ' group by: ' + $scope.rptCriteria.groupBy);



            $scope.showRpt = true;
        }

  });
