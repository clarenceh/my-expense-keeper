'use strict';

angular.module('myExpenseKeeperApp')
  .controller('SecurityCtrl', function ($scope, $log, $http, $location, userService, flashMessage) {

        $scope.flash = flashMessage;
        $scope.actionFailed = false;

        // Login
        $scope.login = function () {

            $scope.$broadcast('autofill:update');

            console.log('Username: ' + $scope.user.username + ' password: ' + $scope.user.password);

            // Login user with server
            //noinspection JSHint
            $http.post('/login/', $scope.user).success(function (data, status) {
                console.log('Login result: ' + data);
                userService.findUserById($scope.user.username, function(user) {
                    console.log('Logged in user: ' + angular.toJson(user));
                    userService.saveUserInfo($scope.user.username, user.userName);

                    $scope.loggedInUser = userService.isLoggedIn();
                    $scope.isLoggedIn = !!$scope.loggedInUser;
                    $scope.$emit('userLoggedIn');

                    $location.path('/');
                });
            }).error(function (data, status) {
                    console.log('Login failed: ' + status);
                    $scope.actionFailed = true;
                });
        };

        $scope.forgotPassword = function() {
            $location.path('/forgotpasswordform');
        };

        $scope.close = function() {
            //dialog.close();
        };

        $scope.cancel = function() //noinspection JSHint
        {
            $location.path('/');
        };

    });
