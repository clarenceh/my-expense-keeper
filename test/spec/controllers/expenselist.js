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

    it('should instantiate an ExpenseaddCrtl', function() {
        expect(!!ExpenseaddCtrl).toBe(true);
    });

});
