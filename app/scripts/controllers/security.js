'use strict';

angular.module('myExpenseKeeperApp')
  .controller('SecurityCtrl', function ($scope, $log, dialog, user, $http, userService) {

        $scope.user = user;

        $scope.actionFailed = false;

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
                $scope.actionFailed = true;
            });
        }

        $scope.close = function(){
            dialog.close();
        };

  });
