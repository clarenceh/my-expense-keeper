'use strict';

angular.module('myExpenseKeeperApp')
    .controller('ExpenselistCtrl', function ($scope, $http, $log, $location, flashMessage) {

        $scope.flash = flashMessage;

        $scope.days = '7';

        $http.get('/api/expense/listdata/' + $scope.days).success(function (data) {
            $log.info('Response data: ' + angular.toJson(data));
            $scope.expenses = data;
        });

        //noinspection JSHint,JSHint
        $scope.$watch('days', function (newValue, oldValue) {
            $http.get('/api/expense/listdata/' + $scope.days).success(function (data) {
                $log.info('Response data: ' + angular.toJson(data));
                $scope.expenses = data;
            });
        });

        $scope.view = function(id) {
            $log.info('Expense id:  ' + id + ' was clicked');
            $location.path('/expenseview/' + id);
        };

    });
