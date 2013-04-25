'use strict';

angular.module('myExpenseKeeperApp')
  .factory('categoryService', function ($http, $log) {
    return {
      findCategoriesByUser: function(userId, callback) {
          $http.get('/api/user/' + userId).success(function(user) {
              callback(user.categories);
          });
      }
    };
  });
