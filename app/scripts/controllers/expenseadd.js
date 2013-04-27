'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseaddCtrl', function ($scope, $http, $log, $location, $filter, $dialog, flashMessage, categoryService) {

        $scope.action = 'Add';

        // TODO: retrieve from logged in user
        $scope.userId = 'ho.clarence@gmail.com';

        $scope.expenseItem = {};

        // Drop down list box for categories
        categoryService.findCategoriesByUser($scope.userId, function(categories) {
            if (!!categories) {
                $scope.categories = categories;
            } else {
                $scope.categories = [];
            }
        });

        var expenseItem = $scope.expenseItem;

        // TODO: Should be dynamic to the current login user
        expenseItem.userId = 'ho.clarence@gmail.com';

        //expenseItem.dateTime = new Date();
        //expenseItem.dateTime = '2013-04-22';
        expenseItem.dateTime = $filter('date')(new Date(), 'yyyy-MM-dd');

        //Check if browser supports W3C Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }

        //Get latitude and longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $log.info('lat: ' + lat + 'long: ' + long);
        }

        function errorFunction() {
            $log.info('Error in reading location');
        }

        $scope.save = function() {
            $log.info('Date: ' + expenseItem.dateTime);
            $log.info('Adding expense');

            // Submit request to server
            $http.post('/api/expense', expenseItem).success(function(data, status) {
                $log.info('Add expense success!');

                // Add message via messageService for display
                flashMessage.set({type: 'success', text: 'Expense item saved successfully'});

                // Redirect to view page
                $location.path('/expenseview/' + data._id);
            }).error(function(data, status) {
                $log.info('Add expense fail: ' + status);
            });
        }

        $scope.cancel = function() {
            $location.path('/expenselist');
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
