'use strict';

angular.module('myExpenseKeeperApp')
  .controller('MainCtrl', function ($scope, $dialog, $location, $window, userService, flashMessage) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

    if ($scope.isLoggedIn) {
        $scope.displayUser = userService.getDisplayUser();
    }

    $scope.flash = flashMessage;

    $scope.list = function () {
        $location.path('/expenselist');
    };

    $scope.add = function () {
        $location.path('/expenseadd');
    };

    $scope.report = function () {
        $location.path('/expenserpt');
    };

    $scope.setting = function () {
        $location.path('/settingform');
    };

    $scope.signIn = function () {
        $location.path('/loginform');
    };

    $scope.register = function () {
        $location.path('/registerform');
    };

    $scope.signOff = function () {
        userService.logOut(function () {
            $location.path('/');
            //$window.location.reload();
            $scope.loggedInUser = userService.isLoggedIn();
            $scope.isLoggedIn = !!$scope.loggedInUser;
            $scope.$emit('userLoggedOff');
        });
    };

});
