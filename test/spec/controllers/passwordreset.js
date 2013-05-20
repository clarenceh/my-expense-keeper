'use strict';

describe('Controller: PasswordresetCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var PasswordresetCtrl,
        scope;

    // Mock version of routeParams
    var routeParams = {
        id: 'dummytoken'
    };

    // Mock version of passwordResetService
    var passwordResetResponse = {
        _id : 'cb8a4854aaa240b3b96d63f5ef4c5713',
        userId : 'abc@domain.com',
        requestDate : new Date()
    }
    var passwordResetService = {
        findRequestById: function(resetToken, callback) {
            callback(passwordResetResponse);
        }
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PasswordresetCtrl = $controller('PasswordresetCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            passwordResetService: passwordResetService
        });
    }));

    it('should instantiate a PasswordresetCtrl', function () {
        expect(!!PasswordresetCtrl).toBe(true);
    });
});
