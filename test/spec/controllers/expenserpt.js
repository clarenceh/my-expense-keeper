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

    it('should instantiate an ExpenserptCtrl', function() {
        expect(!!ExpenserptCtrl).toBe(true);
    });

});
