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
            .when('/expenserpt', {
                templateUrl: 'views/expenserpt.html',
                controller: 'ExpenserptCtrl'
            })
            .when('/loginform', {
                templateUrl: 'views/loginform.html',
                controller: 'SecurityCtrl'
            })
            .when('/registerform', {
                templateUrl: 'views/registerform.html',
                controller: 'RegisterCtrl'
            })
            .when('/settingform', {
                templateUrl: 'views/settingform.html',
                controller: 'SettingCtrl'
            })
            .when('/forgotpasswordform', {
                templateUrl: 'views/forgotpassword.html',
                controller: 'ForgotpasswordCtrl'
            })
            .when('/passwordresetform/:id', {
                templateUrl: 'views/passwordreset.html',
                controller: 'PasswordresetCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
