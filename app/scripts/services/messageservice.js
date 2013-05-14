'use strict';

angular.module('myExpenseKeeperApp')
    .factory('messageService', function () {

        var messages = [];

        // Public API here
        return {
            addMessage: function (message) {
                messages.push(message);
            },
            getMessages: function () {
                return messages;
            },
            containsMessage: function () {
                return (messages.length > 0);
            },
            clearMessages: function () {
                messages.length = 0;
            }
        };
    });
