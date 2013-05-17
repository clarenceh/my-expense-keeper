'use strict';

angular.module('myExpenseKeeperApp')
    .controller('SettingCtrl', function ($scope, $location, $log, userService, languageService, flashMessage) {

    $scope.passwordNotMatch = false;
    $scope.languagePreferred = {};

    $scope.languages = languageService.findAll();

    $scope.userId = userService.isLoggedIn();

    // Retrieve user
    userService.findUserById($scope.userId, function(user) {
        $scope.user = user;

        angular.forEach($scope.languages, function(language) {
            $log.info('Language: ' + angular.toJson(language));
            if (language.locale === user.language) {
                $scope.languagePreferred = language;
            }
        });
    });

    $scope.save = function() {
        $scope.user.language = $scope.languagePreferred.locale;

        // Check password matching if user entered
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.passwordNotMatch = true;
            return;
        }

        $log.info('Saving user settings: ' + angular.toJson($scope.user));

        // Save user
        userService.saveUser($scope.user, function(status) {
            if (status) {
                // Update user login info
                userService.saveUserInfo($scope.user._id, $scope.user.userName);

                // Add message via flashMessage for display
                flashMessage.set({type: 'success', text: 'Settings saved successfully'});

                // Redirect to home page
                $location.path('/');
            }
        });
    };

    $scope.cancel = function() {
        $location.path('/');
    };

});
