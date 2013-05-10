'use strict';

angular.module('myExpenseKeeperApp')
  .controller('TopnavCtrl', function ($scope, $location, userService, $log, $rootScope) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

    $scope.list = function() {
        $location.path('expenselist');
    }

    $scope.add = function() {
        $location.path('expenseadd');
    }

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

    $scope.locationHome = function() {
        if ($location.path() === '/') {
            return true;
        } else {
            return false;
        }
    }

    $scope.locationList = function() {
        if ($location.path() === '/expenselist') {
            return true;
        } else {
            return false;
        }
    }

    $scope.locationAdd = function() {
        if ($location.path() === '/expenseadd') {
            return true;
        } else {
            return false;
        }
    }

    $scope.locationReport = function() {
        if ($location.path() === '/expenserpt') {
            return true;
        } else {
            return false;
        }
    }
  });
