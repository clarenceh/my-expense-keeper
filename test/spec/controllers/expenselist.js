'use strict';

describe('Controller: ExpenselistCtrl', function () {

  // load the controller's module
  beforeEach(module('myExpenseKeeperApp'));

  var ExpenselistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenselistCtrl = $controller('ExpenselistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
