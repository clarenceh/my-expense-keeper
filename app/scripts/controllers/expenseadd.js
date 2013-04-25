'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseaddCtrl', function ($scope, $http, $log, $location, $filter, messageService, categoryService) {

        $scope.action = 'Add';

        // TODO: retrieve from logged in user
        $scope.userId = 'ho.clarence@gmail.com';

        $scope.expenseItem = {};

        // Drop down list box for categories
        categoryService.findCategoriesByUser($scope.userId, function(categories) {
            $scope.categories = categories;
        });

        var expenseItem = $scope.expenseItem;

        // Should be dynamic to the current login user
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
                messageService.addMessage({type: 'success', text: 'Expense item saved successfully'});

                // Redirect to view page
                $location.path('/expenseview/' + data._id);
            }).error(function(data, status) {
                $log.info('Add expense fail: ' + status);
            });
        }

        $scope.cancel = function() {
            $location.path('/expenselist');
        }
    });
