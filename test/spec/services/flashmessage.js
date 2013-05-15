'use strict';

//noinspection JSHint
describe('Service: flashMessage', function () {

    // load the service's module
    //noinspection JSHint
    beforeEach(function() {
        module('myExpenseKeeperApp');
    });

    // instantiate service
    var flashMessageService;
    beforeEach(inject(function (flashMessage) {
        flashMessageService = flashMessage;
    }));

    it('should do something', function () {
        expect(!!flashMessageService).toBe(true);
    });

});
