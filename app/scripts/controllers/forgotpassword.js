'use strict';

angular.module('myExpenseKeeperApp')
    .controller('ForgotpasswordCtrl', function ($scope, $log, $location, $http, userService, flashMessage) {

    $scope.flash = flashMessage;
    $scope.userId = '';
    $scope.userIdNotExist = false;
    $scope.actionFailed = false;

    $scope.sendMail = function() {

        // Check user id exist
        $http.get('/checkuser/' + $scope.userId).success(function (data, status) {

            // User not exist, prompt error
            $scope.userIdNotExist = true;

        }).error(function (data, status) {
                if (status === 404) {
                    $scope.userIdNotExist = false;

                    // User id exist, send email
                    console.log('Request password reset mail for user: ' + $scope.userId);

                    $http.get('/forgotpassword/' + $scope.userId).success(function (data, status) {
                        console.log('Reset email sent successfully');

                        flashMessage.set({type: 'success', text: 'Email with password reset instruction was sent.'});

                        $location.path('/loginform');
                    }).error(function (data, status) {
                            console.log('Password reset failed: ' + status);
                            $scope.actionFailed = true;
                        });
                } else {
                    console.log('Check use id failed: ' + status);
                    $scope.actionFailed = true;
                }
            });

    };

    $scope.cancel = function() {
        $location.path('/loginform');
    };

});
