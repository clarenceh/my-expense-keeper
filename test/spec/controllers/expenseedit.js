'use strict';

describe('Controller: ExpenseeditCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var ExpenseeditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ExpenseeditCtrl = $controller('ExpenseeditCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
