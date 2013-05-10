'use strict';

angular.module('myExpenseKeeperApp')
  .controller('MainCtrl', function ($scope, $dialog, $location, $window, userService) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

/*    $scope.signIn = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/loginform.html', 'SecurityCtrl').then(function(result) {
            //$window.location.reload();
            $scope.loggedInUser = userService.isLoggedIn();
            $scope.isLoggedIn = !!$scope.loggedInUser;
            $scope.$emit('userLoggedIn');
        });
    };*/

    $scope.list = function() {
        $location.path('/expenselist');
    }

    $scope.add = function() {
        $location.path('/expenseadd');
    }

    $scope.report = function() {
        $location.path('/expenserpt');
    }

    $scope.setting = function() {
        // TODO - implement settings view
        $location.path('/');
    }

    $scope.signIn = function() {
        $location.path('/loginform');
    }

    $scope.register = function() {
        $location.path('/registerform');
    }

    $scope.signOff = function() {
        userService.logOut(function() {
            $location.path('/');
            //$window.location.reload();
            $scope.loggedInUser = userService.isLoggedIn();
            $scope.isLoggedIn = !!$scope.loggedInUser;
            $scope.$emit('userLoggedOff');
        });
    }

/*    $scope.register = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/register.html', 'RegisterCtrl').then(function(result) {
            //$window.location.reload();
            $scope.loggedInUser = userService.isLoggedIn();
            $scope.isLoggedIn = !!$scope.loggedInUser;
            $scope.$emit('userLoggedIn');
        });
    };*/

  });
