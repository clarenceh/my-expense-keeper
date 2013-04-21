'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseaddCtrl', function ($scope, $http, $log) {

        $scope.action = 'Add';

        $scope.expenseItem = {};

        var expenseItem = $scope.expenseItem;
        expenseItem.dateTime = new Date();

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
            $log.info("Date: " + expenseItem.dateTime);
        }
    });
