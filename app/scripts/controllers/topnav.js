'use strict';

angular.module('myExpenseKeeperApp')
  .controller('TopnavCtrl', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.list = function() {
        $location.path('expenselist');
    }
  });
