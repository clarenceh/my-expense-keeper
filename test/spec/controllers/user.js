'use strict';

describe('Controller: UserCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var UserCtrl,
        scope;

    var dialog = {
        close: function() {
        }
    }

    var category = 'dummyCategory';

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        UserCtrl = $controller('UserCtrl', {
            $scope: scope,
            dialog: dialog,
            category: category
        });
    }));

    it('should instantiate an UserCtrl', function() {
        expect(!!UserCtrl).toBe(true);
    });
});
