'use strict';

angular.module('myExpenseKeeperApp')
  .controller('SecurityCtrl', function ($scope, $log, dialog, user, $http) {

        $scope.user = user;

        // Login
        $scope.login = function() {
            console.log("Username: " + $scope.user.username + " password: " + $scope.user.password);

            // Login user with server
            $http.post('/login/', $scope.user).success(function(data, status) {
                console.log("Login result: " + data);
                dialog.close();
            }).error(function(data, status) {
                console.log('Login failed: ' + status);
            });
        }

        $scope.close = function(){
            dialog.close();
        };

  });
