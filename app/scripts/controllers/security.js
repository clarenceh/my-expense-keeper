'use strict';

angular.module('myExpenseKeeperApp')
  .controller('SecurityCtrl', function ($scope, $log, $http, $location, userService) {

        //$scope.user = user;

        $scope.actionFailed = false;

        // Login
        $scope.login = function() {
            console.log("Username: " + $scope.user.username + " password: " + $scope.user.password);

            // Login user with server
            $http.post('/login/', $scope.user).success(function(data, status) {
                console.log("Login result: " + data);
                userService.saveUserInfo($scope.user.username);
                //dialog.close();

                $scope.loggedInUser = userService.isLoggedIn();
                $scope.isLoggedIn = !!$scope.loggedInUser;
                $scope.$emit('userLoggedIn');

                $location.path('/');
            }).error(function(data, status) {
                console.log('Login failed: ' + status);
                $scope.actionFailed = true;
            });
        }

        $scope.close = function() {
            //dialog.close();
        };

        $scope.cancel = function() {
            $location.path('/');
        }

  });
