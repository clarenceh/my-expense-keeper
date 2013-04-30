'use strict';

describe('Controller: ExpenserptCtrl', function () {

  // load the controller's module
  beforeEach(module('myExpenseKeeperApp'));

  var ExpenserptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenserptCtrl = $controller('ExpenserptCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
