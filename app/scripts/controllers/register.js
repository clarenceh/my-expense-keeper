'use strict';

angular.module('myExpenseKeeperApp')
  .controller('RegisterCtrl', function ($scope, $log, dialog, user, $http, userService) {

        $scope.user = user;

        $scope.actionFailed = false;
        $scope.userIdExist = false;

        $scope.close = function(){
            dialog.close();
        };

        // Register
        $scope.register = function() {
            console.log("Username: " + $scope.user.username + " password: " + $scope.user.password);

            // Check existence of username
            $http.get('/checkuser/' + $scope.user.username).success(function(data, status) {

                console.log('Registering user');
                $http.post('/register/', $scope.user).success(function(data, status) {
                    console.log("Register result: " + data);
                    dialog.close();
                }).error(function(data, status) {
                    console.log('Register failed: ' + status);
                    $scope.actionFailed = true;
                });

                console.log("Register result: " + data);

                // Save log in information
                userService.saveUserInfo($scope.user.username);

                dialog.close();
            }).error(function(data, status) {
                console.log('Register failed: ' + status);
                if (status == 404) {
                    $scope.userIdExist = true;
                }
            });

        }

  });
