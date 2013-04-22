'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenselistCtrl', function ($scope, $http, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('/api/expense/listdata').success(function(data) {
        $log.info('Response data: ' + data);
        $scope.expenses = data;
    });

  });
