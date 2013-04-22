'use strict';

/*angular.module('myExpenseKeeperApp')
  .directive('skyDate', function (dateFilter, $log) {
    return {
      //template: '<div></div>',
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        $log.info('In skyDate directive');
        $log.info('ngModel value: ' + ngModel);
        $log.info(typeof ngModel.constructor);
        //element.text('this is the skyDate directive');

        var format = 'yyyy-MM-dd';
        //$log.info('Date: ' + dateFilter(new Date(), format));
        //element.val('2013-04-12');
        element.text('2013-04-12');
      }
    };
  });*/

angular.module('myExpenseKeeperApp')
    .directive('skyDate', function (dateFilter, $log) {
        return {
            // Enforce the angularJS default of restricting the directive to
            // attributes only
            restrict: 'A',
            // Always use along with an ng-model
            require: '?ngModel',
            scope: {
                // This method needs to be defined and
                // passed in to the directive from the view controller
                select: '&' // Bind the select function we refer to the right scope
            },
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;
                var optionsObj = {};
                optionsObj.dateFormat = 'yy-mm-dd';
                var updateModel = function(dateTxt) {
                    scope.$apply(function () {
                        // Call the internal AngularJS helper to
                        // update the two-way binding
                        ngModel.$setViewValue(dateTxt);
                    });
                };
                optionsObj.onSelect = function(dateTxt, picker) {
                    updateModel(dateTxt);
                    if (scope.select) {
                        scope.$apply(function() {
                            scope.select({date: dateTxt});
                        });
                    }
                };
                ngModel.$render = function() {
                    // Use the AngularJS internal 'binding-specific' variable
                    element.datepicker('setDate', ngModel.$viewValue || '');
                };
                element.datepicker(optionsObj);
            }
        };
    });
