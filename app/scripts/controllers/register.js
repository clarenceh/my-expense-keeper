'use strict';

angular.module('myExpenseKeeperApp')
  .controller('RegisterCtrl', function ($scope, $log, $http, $location, userService) {

        $scope.user = {};

        $scope.actionFailed = false;
        $scope.userIdExist = false;
        $scope.passwordNotMatch = false;

        // Register
        $scope.register = function () {

            $scope.actionFailed = false;
            $scope.userIdExist = false;
            $scope.passwordNotMatch = false;

            console.log('Username: ' + $scope.user.username + ' password: ' + $scope.user.password);

            if ($scope.user.password !== $scope.user.confirmPassword) {
                $scope.passwordNotMatch = true;
                return;
            }

            // Check existence of username
            //noinspection JSHint
            $http.get('/checkuser/' + $scope.user.username).success(function (data, status) {

                console.log('Registering user');
                //noinspection JSHint
                $http.post('/register/', $scope.user).success(function (data, status) {
                    console.log('Register result: ' + data);
                    //dialog.close();
                    $location.path('/');
                }).error(function (data, status) {
                        console.log('Register failed: ' + status);
                        $scope.actionFailed = true;
                    });

                console.log('Register result: ' + data);

                // Save log in information
                userService.saveUserInfo($scope.user.username);

                $scope.loggedInUser = userService.isLoggedIn();
                $scope.isLoggedIn = !!$scope.loggedInUser;
                $scope.$emit('userLoggedIn');

                $location.path('/');

                //dialog.close();
            }).error(function (data, status) {
                    console.log('Register failed: ' + status);
                    if (status === 404) {
                        $scope.userIdExist = true;
                    }
                });

        };

        $scope.cancel = function() {
            $location.path('/');
        };

    });
