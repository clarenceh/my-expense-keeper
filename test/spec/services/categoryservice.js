'use strict';

describe('Service: categoryService', function () {

  // load the service's module
  beforeEach(module('myExpenseKeeperApp'));

  // instantiate service
  var categoryservice;
  beforeEach(inject(function (_categoryservice_) {
    categoryservice = _categoryservice_;
  }));

  it('should do something', function () {
    expect(!!categoryservice).toBe(true);
  });

});
