'use strict';

describe('Controller: RegisterCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var RegisterCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        RegisterCtrl = $controller('RegisterCtrl', {
            $scope: scope
        });
    }));

    it('should instantiate an RegisterCtrl', function() {
        expect(!!RegisterCtrl).toBe(true);
    });
});
