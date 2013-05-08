'use strict';

angular.module('myExpenseKeeperApp')
  .controller('UserCtrl', function ($scope, $http, dialog, category) {

        $scope.category = category;

        $scope.addCategory = function() {
            console.log('Adding category: ' + $scope.category);

            var userCategory = {category: $scope.category};
            $http.post('/api/category', userCategory).success(function(data, status) {
                console.log('Category added successfully: ' + $scope.category);
                dialog.close($scope.category);
            }).error(function(data, status) {
                console.log('Error adding category: ' + status);
                dialog.close();
            })
        }

        $scope.close = function(){
            dialog.close();
        };
  });
