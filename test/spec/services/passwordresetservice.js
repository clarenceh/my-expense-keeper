'use strict';

describe('Service: passwordResetService', function () {

    // load the service's module
    beforeEach(module('myExpenseKeeperApp'));

    // instantiate service
    var passwordResetService;
    beforeEach(inject(function (_passwordResetService_) {
        passwordResetService = _passwordResetService_;
    }));

    it('should do something', function () {
        expect(!!passwordResetService).toBe(true);
    });

});
