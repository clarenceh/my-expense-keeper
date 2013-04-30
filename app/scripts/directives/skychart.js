'use strict';

angular.module('myExpenseKeeperApp')
  .directive('skyChart', function () {
    return {
      template: '<div></div>',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        element.text('this is the skychart directive');
      }
    };
  });
