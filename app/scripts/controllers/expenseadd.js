'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseaddCtrl', function ($scope, $http, $log, $location, $filter) {

        $scope.action = 'Add';

        $scope.expenseItem = {};

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

                // Redirect to view page
                $location.path('/expenseview/' + data._id);
            }).error(function(data, status) {
                $log.info('Add expense fail: ' + status);
            });
        }
    });
