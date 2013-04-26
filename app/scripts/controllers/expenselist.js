'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenselistCtrl', function ($scope, $http, $log, flashMessage) {

    $scope.flash = flashMessage;

    $http.get('/api/expense/listdata').success(function(data) {
        $log.info('Response data: ' + data);
        $scope.expenses = data;
    });

  });
