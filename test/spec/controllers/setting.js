'use strict';

describe('Controller: SettingCtrl', function () {

    // load the controller's module
    beforeEach(module('myExpenseKeeperApp'));

    var SettingCtrl,
        scope;

    var defaultLanguage = {name: 'English', locale: 'en_US'},
        languages = [defaultLanguage];

    // Mock version of language service
    var languageService = {
        findAll: function () {
            return languages;
        },
        getDefaultLanguage: function() {
            return defaultLanguage;
        }
    }

    var userResponse = {
        "_id": "abc@domain.com",
        "categories": [
            "Eat",
            "Cloth",
            "Sport"
        ],
        "userName": "Clarence"
    };

    // Mock version of user service
    var userService = {
        findUserById: function(userId, callback) {
            callback(userResponse);
        },
        isLoggedIn: function() {
            return 'abc@domain.com';
        }
    }

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SettingCtrl = $controller('SettingCtrl', {
            $scope: scope,
            userService: userService,
            languageService: languageService
        });
    }));

    it('should instantiate an SettingCtrl', function() {
        expect(!!SettingCtrl).toBe(true);
    });

});
