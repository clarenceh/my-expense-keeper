'use strict';

describe('Controller: ExpenseviewCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var ExpenseviewCtrl,
        scope;

    var $httpBackend;

    // Mock route params
    var routeParams = {
        id: 1
    }

    var expenseResponse = {
        "userId": "abc@domain.com",
        "dateTime": "2013-05-14T00:00:00.000Z",
        "rating": 3,
        "category": "Sport",
        "location": "Kowloon City",
        "amount": 19,
        "_id": "1"
    }

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/expense/1').respond(expenseResponse);

        scope = $rootScope.$new();
        ExpenseviewCtrl = $controller('ExpenseviewCtrl', {
            $scope: scope,
            $routeParams: routeParams
        });
    }));

    it('should instantiate an ExpenseviewCtrl', function() {
        expect(!!ExpenseviewCtrl).toBe(true);
    });

});
