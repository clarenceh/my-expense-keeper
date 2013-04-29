'use strict';

angular.module('myExpenseKeeperApp')
  .controller('SecurityCtrl', function ($scope, $log, dialog, user, $http, userService) {

        $scope.user = user;

        // Login
        $scope.login = function() {
            console.log("Username: " + $scope.user.username + " password: " + $scope.user.password);

            // Login user with server
            $http.post('/login/', $scope.user).success(function(data, status) {
                console.log("Login result: " + data);
                userService.saveUserInfo($scope.user.username);
                dialog.close();
            }).error(function(data, status) {
                console.log('Login failed: ' + status);
            });
        }

        $scope.close = function(){
            dialog.close();
        };

        // Register
        $scope.register = function() {
            console.log("Username: " + $scope.user.username + " password: " + $scope.user.password);

            // Register user with server
            $http.post('/register/', $scope.user).success(function(data, status) {
                console.log("Register result: " + data);
                dialog.close();
            }).error(function(data, status) {
                console.log('Register failed: ' + status);
            });
        }

  });
