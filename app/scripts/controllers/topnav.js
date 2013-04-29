'use strict';

angular.module('myExpenseKeeperApp')
  .controller('TopnavCtrl', function ($scope, $location, userService) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

    $scope.list = function() {
        $location.path('expenselist');
    }

    $scope.add = function() {
        $location.path('expenseadd');
    }
  });
