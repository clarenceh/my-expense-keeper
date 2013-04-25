'use strict';

angular.module('myExpenseKeeperApp')
  .factory('userService', function ($http, $log) {
    return {
      findUserById: function(userId) {
        //var user = {_id: 'ho.clarence@gmail.com', categories:['Eat', 'Cloth', 'Sport', 'Book']};
        $http.get('/api/user/' + userId).success(function(user) {
            $log.info('Response user data: ' + user);
            return user;
        });
      }
    };
  });
