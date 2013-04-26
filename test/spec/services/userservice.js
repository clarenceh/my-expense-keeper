'use strict';

describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('myExpenseKeeperApp'));

  // instantiate service
  var userservice;
  beforeEach(inject(function (_userservice_) {
    userservice = _userservice_;
  }));

  it('should do something', function () {
    expect(!!userservice).toBe(true);
  });

});
