'use strict';

angular.module('myExpenseKeeperApp')
    .factory('languageService', function () {
        // Service logic
        var defaultLanguage = {name: 'English', locale: 'en_US'},
            languages = [defaultLanguage];

        // Public API here
        return {
            findAll: function () {
                return languages;
            },
            getDefaultLanguage: function() {
                return defaultLanguage;
            }
        };
    });
