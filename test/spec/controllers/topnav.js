'use strict';

describe('Controller: TopnavCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var TopnavCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TopnavCtrl = $controller('TopnavCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
