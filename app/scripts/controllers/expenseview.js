'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseviewCtrl', function ($scope, $http, $routeParams, $log, $location) {

        $scope.action = 'View';

        var expenseId = $routeParams.id;

        // Submit request to server
        $http.get('/api/expense/' + expenseId).success(function(data, status) {
            $log.info('Get expense success: ' + data);
            $scope.expenseItem = data;
        }).error(function(data, status) {
                $log.info('Get expense fail: ' + status);
        });

        $scope.edit = function() {
            // Redirect to edit view
            $location.path('/expenseedit/' + expenseId);
        }

        $scope.delete = function() {
            $log.info('Deleting expense');

            // Submit request to server
            $http.delete('/api/expense/' + expenseId).success(function(data, status) {
                $log.info('Delete expense success!');

                // Redirect to list page
                $location.path('/expenselist');
            }).error(function(data, status) {
                    $log.info('Save expense fail: ' + status);
            });
        }

        $scope.back = function() {
            // Redirect to list page
            $location.path('/expenselist');
        }
  });
