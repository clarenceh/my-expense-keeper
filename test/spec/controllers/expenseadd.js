'use strict';

describe('Controller: ExpenseaddCtrl', function () {

  // load the controller's module
  beforeEach(module('myExpenseKeeperApp'));

  var ExpenseaddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseaddCtrl = $controller('ExpenseaddCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
