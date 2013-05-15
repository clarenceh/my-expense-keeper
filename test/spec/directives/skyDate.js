'use strict';

describe('Directive: skyDate', function () {
    beforeEach(module('myExpenseKeeperApp'));

    var element;

    it('should make hidden element visible', inject(function ($rootScope, $compile) {
        element = angular.element('<sky-date></sky-date>');
        element = $compile(element)($rootScope);
        expect(element.text()).toBe('');
    }));
});
