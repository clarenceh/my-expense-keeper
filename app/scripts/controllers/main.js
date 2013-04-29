'use strict';

angular.module('myExpenseKeeperApp')
  .controller('MainCtrl', function ($scope, $dialog, $location, $window, userService) {

    $scope.loggedInUser = userService.isLoggedIn();
    $scope.isLoggedIn = !!$scope.loggedInUser;

    $scope.signIn = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/login.html', 'SecurityCtrl').then(function(result) {
            $window.location.reload();
        });
    };

    $scope.signOff = function() {
        userService.logOut(function() {
            $location.path('/');
            $window.location.reload();
        });
    }

    $scope.register = function(user) {
        var d = $dialog.dialog({dialogFade: true, resolve: {user: function(){ return angular.copy(user); }} });
        d.open('template/dialog/register.html', 'RegisterCtrl');
    };

  });
