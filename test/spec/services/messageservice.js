'use strict';

describe('Service: messageservice', function () {

  // load the service's module
  beforeEach(module('myExpenseKeeperApp'));

  // instantiate service
  var messageservice;
  beforeEach(inject(function (_messageservice_) {
    messageservice = _messageservice_;
  }));

  it('should do something', function () {
    expect(!!messageservice).toBe(true);
  });

});
