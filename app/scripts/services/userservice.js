'use strict';

angular.module('myExpenseKeeperApp')
    .factory('userService', function ($http, $log) {
        var sessionStorageAvailable = ('sessionStorage' in window);
        return {
            findUserById: function (userId, callback) {
                $http.get('/api/user/' + userId).success(function (user) {
                    $log.info('Response user data: ' + angular.toJson(user));
                    callback(user);
                });
            },
            saveUser: function(updatedUser, callback) {
                $http.post('/api/user/' + updatedUser._id, updatedUser).success(function() {
                    $log.info('User saved successfully');
                    callback(true);  // return with success result
                });
            },
            saveUserInfo: function (userId, userName) {
                // Store the user name in session storage
                if (sessionStorageAvailable) {
                    console.log('Session storage available');
                    sessionStorage.username = userId;
                    sessionStorage.displayName = userName;
                    $log.info('User info saved to session storage');
                }
            },
            isLoggedIn: function () {
                if (sessionStorageAvailable) {
                    return sessionStorage.username;
                } else {
                    return null;
                }
            },
            getDisplayUser: function() {
                if (sessionStorageAvailable) {
                    return sessionStorage.displayName;
                } else {
                    return null;
                }
            },
            logOut: function (callback) {
                $log.info('Start to log out user');
                $http.get('/logout').success(function () {
                    $log.info('User logged out');
                    // Clear session storage
                    if (sessionStorageAvailable) {
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('displayName');
                    }
                    callback();
                });
            }
        };
    });
