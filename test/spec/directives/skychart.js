'use strict';

describe('Directive: skyChart', function () {
    beforeEach(module('myExpenseKeeperApp'));

    var element;

    it('should make hidden element visible', inject(function ($rootScope, $compile) {
        element = angular.element('<skychart></skychart>');
        element = $compile(element)($rootScope);
        expect(element.text()).toBe('this is the skychart directive');
    }));
});
