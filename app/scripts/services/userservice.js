'use strict';

angular.module('myExpenseKeeperApp')
  .factory('userService', function ($http, $log) {
    var sessionStorageAvailable = ('sessionStorage' in window);
    return {
      findUserById: function(userId) {
        //var user = {_id: 'ho.clarence@gmail.com', categories:['Eat', 'Cloth', 'Sport', 'Book']};
        $http.get('/api/user/' + userId).success(function(user) {
            $log.info('Response user data: ' + user);
            return user;
        });
      },
      saveUserInfo: function(userId) {
          // Store the user name in session storage
          if (sessionStorageAvailable) {
              console.log('Session storage available');
              sessionStorage.username = userId;
              $log.info('User info saved to session storage');
          }
      },
      isLoggedIn: function() {
          if (sessionStorageAvailable) {
              return sessionStorage.username;
          } else {
              return null;
          }
      },
      logOut: function(callback) {
          $log.info('Start to log out user');
          $http.get('/logout').success(function() {
              $log.info('User logged out');
              // Clear session storage
              if (sessionStorageAvailable) {
                sessionStorage.removeItem('username');
              }
              callback();
          });
      }
    };
  });
