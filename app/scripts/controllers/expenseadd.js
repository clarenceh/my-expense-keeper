'use strict';

angular.module('myExpenseKeeperApp')
  .controller('ExpenseaddCtrl', function ($scope, $http, $log, $location, $filter, $dialog, flashMessage, categoryService, userService) {

        $scope.action = 'Add';

        $scope.userId = userService.isLoggedIn();

        $scope.expenseItem = {};

        // For rating field readonly control
        $scope.isReadonly = false;

        var expenseItem = $scope.expenseItem;

        expenseItem.userId = $scope.userId;

        // Drop down list box for categories
        categoryService.findCategoriesByUser($scope.userId, function(categories) {
            if (!!categories) {
                $scope.categories = categories;
                expenseItem.category = categories[0];
            } else {
                $scope.categories = [];
            }
        });

        expenseItem.dateTime = $filter('date')(new Date(), 'yyyy-MM-dd');

        expenseItem.rating = 0;

        //Get latitude and longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $log.info('lat: ' + lat + 'lng: ' + lng);

            // Get the current location in text
            //noinspection JSHint
            var latlng = new google.maps.LatLng(lat, lng);

            //noinspection JSHint
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({'latLng': latlng}, function(results, status) {
                //noinspection JSHint
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[2]) { //noinspection JSHint
                        {
                            /*jshint camelcase:false */
                            $log.info('Address: ' + results[2].formatted_address);
                            expenseItem.location = results[2].formatted_address;
                            $scope.$apply();
                        }
                    }
                }
            });

        }

        function errorFunction() {
            $log.info('Error in reading location');
        }

        //Check if browser supports W3C Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }

        $scope.save = function () {
            $log.info('Date: ' + expenseItem.dateTime);
            $log.info('Adding expense');

            // Submit request to server
            //noinspection JSHint
            $http.post('/api/expense', expenseItem).success(function (data, status) {
                $log.info('Add expense success!');

                // Add message via messageService for display
                flashMessage.set({type: 'success', text: 'Expense item saved successfully'});

                // Redirect to view page
                $location.path('/expenseview/' + data._id);
            }).error(function (data, status) {
                    $log.info('Add expense fail: ' + status);
                });
        };

        $scope.cancel = function () {
            $location.path('/expenselist');
        };

        $scope.clearRating = function () {
            expenseItem.rating = 0;
        };

        $scope.addCategory = function(category) {
            var d = $dialog.dialog({dialogFade: true, resolve: {category: function(){ return angular.copy(category); }} });
            d.open('template/dialog/add-category.html', 'UserCtrl')
                .then(function(result) {
                    console.log('In add expense - category: ' + result);
                    if (result !== undefined && result.length > 0) {
                        $scope.categories.push(result);
                        expenseItem.category = result;
                    }
                });
        };

    });
