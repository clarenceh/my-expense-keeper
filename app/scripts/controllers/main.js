'use strict';

angular.module('myExpenseKeeperApp')
  .controller('MainCtrl', function ($scope, $dialog) {

    $scope.signIn = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/login.html', 'SecurityCtrl');
    };

    $scope.register = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/register.html', 'SecurityCtrl');
    };

  });
