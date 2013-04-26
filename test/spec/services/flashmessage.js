'use strict';

describe('Service: flashMessage', function () {

  // load the service's module
  beforeEach(module('myExpenseKeeperApp'));

  // instantiate service
  var flashmessage;
  beforeEach(inject(function (_flashmessage_) {
    flashmessage = _flashmessage_;
  }));

  it('should do something', function () {
    expect(!!flashmessage).toBe(true);
  });

});
