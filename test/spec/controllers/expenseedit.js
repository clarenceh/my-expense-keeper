'use strict';

describe('Controller: ExpenseeditCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var ExpenseeditCtrl,
        scope;

    var $httpBackend;

    var categories = ["Eat", "Cloth", "Sport"];

    // Mock version of user service
    var userService = {
        isLoggedIn: function() {
            return 'abc@domain.com';
        }
    }

    // Mock version of category service
    var categoryService = {
        findCategoriesByUser: function(userId, callback) {
            callback(categories);
        }
    }

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
        ExpenseeditCtrl = $controller('ExpenseeditCtrl', {
            $scope: scope,
            userService: userService,
            categoryService: categoryService,
            $routeParams: routeParams
        });
    }));

    it('should instantiate an ExpenseeditCtrl', function() {
        expect(!!ExpenseeditCtrl).toBe(true);
    });
});
