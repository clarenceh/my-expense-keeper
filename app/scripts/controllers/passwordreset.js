'use strict';

angular.module('myExpenseKeeperApp')
    .controller('PasswordresetCtrl', function ($scope, $routeParams, $log, $location, passwordResetService, flashMessage) {

    $scope.flash = flashMessage;
    $scope.passwordNotMatch = false;
    var resetToken = $routeParams.id;

    // Retrieve the password reset request record
    passwordResetService.findRequestById(resetToken, function(resetRequest) {
        if (angular.isUndefined(resetRequest.userId)) {
            flashMessage.set({type: 'error', text: 'Request invalid or expired, please submit a new one.'});

            $location.path('/forgotpasswordform');
        } else {
            $log.info('Reset request: ' + angular.toJson(resetRequest));

            $scope.userId = resetRequest.userId;
        }
    });

    $scope.resetPassword = function() {

        if ($scope.password !== $scope.confirmPassword) {
            $scope.passwordNotMatch = true;
            return;
        }

        // Submit reset password on server
        var resetRequest = {
            userId: $scope.userId,
            password: $scope.password
        };

        passwordResetService.resetPassword(resetRequest, function() {
            flashMessage.set({type: 'success', text: 'Password reset successfully'});

            $location.path('/loginform');
        });
    };

});
