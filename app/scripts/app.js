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
      .when('/expenseadd', {
        templateUrl: 'views/expenseform.html',
        controller: 'ExpenseaddCtrl'
      })
      .when('/expenseview/:id', {
        templateUrl: 'views/expenseview.html',
        controller: 'ExpenseviewCtrl'
      })
      .when('/expenseedit/:id', {
        templateUrl: 'views/expenseform.html',
        controller: 'ExpenseeditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
