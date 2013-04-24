'use strict';

angular.module('myExpenseKeeperApp')
  .factory('messageService', function () {

    var messages = [];
    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      addMessage: function(message) {
          messages.push(message);
      },
      getMessages: function() {
          return messages;
      },
      containsMessage: function() {
          if (messages.length > 0)
            return true;
          else
            return false;
      },
      clearMessages: function() {
          messages.length = 0;
      }
    };
  });
