'use strict';

describe('Controller: ExpenselistCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var ExpenselistCtrl,
        scope;

    var $httpBackend;

    var sampleResponse = '[{"userId":"ho.clarence@gmail.com","dateTime":"2013-05-13T00:00:00.000Z","rating":0,"location":"Diamond Hill","category":"Cloth","amount":123,"_id":"5190901de2c8a42429000001"}] ';

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/expense/listdata/7').respond(sampleResponse);

        scope = $rootScope.$new();
        ExpenselistCtrl = $controller('ExpenselistCtrl', {
            $scope: scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should instantiate an ExpenselistCtrl', function() {
        expect(!!ExpenselistCtrl).toBe(true);
        $httpBackend.flush();
    });

});
