'use strict';

describe('Controller: ForgotpasswordCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var ForgotpasswordCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ForgotpasswordCtrl = $controller('ForgotpasswordCtrl', {
            $scope: scope
        });
    }));

    it('should instantiate a ForgotpasswordCtrl', function () {
        expect(!!ForgotpasswordCtrl).toBe(true);
    });
});
