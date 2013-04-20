'use strict';

angular.module('myExpenseKeeperApp')
  .controller('TopnavCtrl', function ($scope, $location) {

    $scope.list = function() {
        $location.path('expenselist');
    }

    $scope.add = function() {
        $location.path('expenseadd');
    }
  });
