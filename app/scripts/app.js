'use strict';

angular.module('myExpenseKeeperApp', ['ui', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/expenselist', {
        templateUrl: 'views/expenselist.html',
        controller: 'ExpenselistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
