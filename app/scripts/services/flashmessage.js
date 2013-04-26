'use strict';

angular.module('myExpenseKeeperApp')
  .factory('flashMessage', function ($rootScope, $log) {

    var queue = [], currentMessage = {};

    $rootScope.$on('$routeChangeStart', function() {
        console.log("Route change start, queue length: " + queue.length);
        if (queue.length > 0)
            currentMessage = queue.shift();
        else
            currentMessage = {};
    });

    // Public API here
    return {
        set: function(message) {
            //$log.info("Setting message: " + message);
            queue.push(message);
        },
        get: function() {
            //$log.info("Getting current message: " + currentMessage.text);
            return currentMessage;
        }
    };
  });
