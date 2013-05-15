'use strict';

describe('Controller: ExpenseaddCtrl', function () {

    // load the controller's module
    beforeEach(function() {
        module('myExpenseKeeperApp');
    });

    var ExpenseaddCtrl,
        scope;

    var $httpBackend;

    var userResponse = {
        "_id": "abc@domain.com",
        "categories": [
            "Eat",
            "Cloth",
            "Sport"
        ],
        "userName": "Clarence"
    };

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

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/user/abc@domain.com').respond(userResponse);

        scope = $rootScope.$new();
        scope.userId = 'abc@domain.com';
        ExpenseaddCtrl = $controller('ExpenseaddCtrl', {
            $scope: scope,
            userService: userService,
            categoryService: categoryService
        });
    }));

    it('should instantiate an ExpenseaddCrtl', function() {
        expect(!!ExpenseaddCtrl).toBe(true);
    });
});
