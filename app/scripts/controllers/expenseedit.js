'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseeditCtrl', function ($scope, $http, $routeParams, $log, $filter, $location, $dialog,
                                           flashMessage, categoryService, userService) {

        $scope.action = 'Edit';

        var expenseId = $routeParams.id;
        var expenseItem = {};

        $scope.userId = userService.isLoggedIn();

        // Drop down list box for categories
        categoryService.findCategoriesByUser($scope.userId, function(categories) {
            if (!!categories) {
                $scope.categories = categories;
            } else {
                $scope.categories = [];
            }
        });

        // Submit request to server
        $http.get('/api/expense/' + expenseId).success(function(data, status) {
            $log.info('Get expense success: ' + data);
            $log.info('Expense date: ' + data.dateTime);
            $scope.expenseItem = data;

            expenseItem = $scope.expenseItem;
            expenseItem.dateTime = $filter('date')(expenseItem.dateTime, 'yyyy-MM-dd');
        }).error(function(data, status) {
                $log.info('Get expense fail: ' + status);
        });

        $scope.save = function() {
            $log.info('Date: ' + expenseItem.dateTime);
            $log.info('Saving expense');

            // Submit request to server
            $http.put('/api/expense/' + expenseId, expenseItem).success(function(data, status) {
                $log.info('Edit expense success!');

                // Add message via flashMessage for display
                flashMessage.set({type: 'success', text: 'Expense item saved successfully'});

                // Redirect to view page
                $location.path('/expenseview/' + expenseId);
            }).error(function(data, status) {
                    $log.info('Save expense fail: ' + status);
            });
        }

        $scope.cancel = function() {
            window.history.back();
        }

        $scope.addCategory = function(category) {
            var d = $dialog.dialog({dialogFade: true, resolve: {category: function(){ return angular.copy(category); }} });
            d.open('template/dialog/add-category.html', 'UserCtrl')
                .then(function(result) {
                    console.log('In add expense - category: ' + result);
                    $scope.categories.push(result);
                    expenseItem.category = result;
                });
        };

  });
