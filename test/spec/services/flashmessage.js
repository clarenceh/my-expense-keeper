'use strict';

//noinspection JSHint
describe('Service: flashMessage', function () {

    // load the service's module
    //noinspection JSHint
    beforeEach(function() {
        module('myExpenseKeeperApp');
    });

    // instantiate service
    var flashMessage;
    beforeEach(inject(function (_flashmessage_) {
        flashMessage = _flashmessage_;
    }));

    it('should do something', function () {
        expect(!!flashMessage).toBe(true);
    });

});
