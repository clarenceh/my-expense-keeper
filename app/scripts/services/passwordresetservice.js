'use strict';

angular.module('myExpenseKeeperApp')
    .factory('passwordResetService', function ($http, $log) {
        // Service logic

        // Public API here
        return {
            findRequestById: function (id, callback) {
                $http.get('/resetpasswordrequest/' + id).success(function(resetRequest) {
                    $log.info('Response request data: ' + angular.toJson(resetRequest));
                    callback(resetRequest);
                });
            },
            resetPassword: function(resetRequest, callback) {
                $http.post('/resetpassword', resetRequest).success(function(data, status) {
                    $log.info('Password reset successfully');
                    callback();
                });
            }
        };
    });
