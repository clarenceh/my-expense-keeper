'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenserptCtrl', function ($scope, $location) {

        $scope.rptCriteria = {};

        $scope.groupByOptions = ['Category', 'Location'];

        $scope.cancel = function() {
            $location.path('/expenselist');
        }

  });
