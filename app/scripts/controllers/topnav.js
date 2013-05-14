'use strict';

angular.module('myExpenseKeeperApp')
  .controller('TopnavCtrl', function ($scope, $location, userService, $log, $rootScope) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

    $scope.home = function () {
        $location.path('/');
    };

    $scope.list = function () {
        $location.path('expenselist');
    };

    $scope.add = function () {
        $location.path('expenseadd');
    };

    $rootScope.$on('userLoggedIn', function() {
        $log.info('User logged in');
        $scope.loggedInUser = userService.isLoggedIn();
        $scope.isLoggedIn = !!$scope.loggedInUser;
    });

    $rootScope.$on('userLoggedOff', function() {
        $log.info('User logged off');
        $scope.loggedInUser = userService.isLoggedIn();
        $scope.isLoggedIn = !!$scope.loggedInUser;
    });

    $scope.locationHome = function () {
        return ($location.path() === '/');
    };

    $scope.locationList = function () {
        return ($location.path() === '/expenselist');
    };

    $scope.locationAdd = function () {
        return ($location.path() === '/expenseadd');
    };

    $scope.locationReport = function() {
        return ($location.path() === '/expenserpt');
    };
});
