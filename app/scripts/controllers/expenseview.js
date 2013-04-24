'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseviewCtrl', function ($scope, $http, $routeParams, $log, $location, $dialog, messageService) {

        $log.info(messageService.getMessages().length);

        $scope.displayMessage = messageService.containsMessage();
        if ($scope.displayMessage) {
            $scope.messages = messageService.getMessages();
        }

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
            messageService.clearMessages();
            // Redirect to edit view
            $location.path('/expenseedit/' + expenseId);
        }

        $scope.confirmDelete = function() {
            var title = 'Confirm Deletion';
            var msg = 'Are you sure to delete this expense item?';
            var btns = [{result:'cancel', label: 'Cancel'}, {result:'delete', label: 'Delete', cssClass: 'btn-danger'}];

            $dialog.messageBox(title, msg, btns)
                .open()
                .then(function(result){
                    if (result === 'delete') {
                        $scope.delete();
                    }
                });
        }

        $scope.delete = function() {
            $log.info('Deleting expense');

            messageService.clearMessages();

            // Submit request to server
            $http.delete('/api/expense/' + expenseId).success(function(data, status) {
                $log.info('Delete expense success!');

                var title = 'Confirmation Message';
                var msg = 'Expense item deleted successfully';
                var btns = [{result:'ok', label: 'OK', cssClass: 'btn-success'}];

                $dialog.messageBox(title, msg, btns)
                    .open()
                    .then(function(result){
                    });

                // Redirect to list page
                $location.path('/expenselist').replace();
            }).error(function(data, status) {
                    $log.info('Save expense fail: ' + status);
            });
        }

        $scope.back = function() {
            messageService.clearMessages();
            // Redirect to list page
            $location.path('/expenselist');
        }
  });
