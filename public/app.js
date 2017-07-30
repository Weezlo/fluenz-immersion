var myApp = angular.module('fluenzIntensiveTraining', ['ui.router']);

myApp.config(function ($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    };

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});

//region Controllers
myApp.controller('TestController', ['$scope', '$http', function ($scope, $http) {
    $scope.message = 'it is I!';

    $scope.callBackend = function () {
        $http({
            method: 'POST',
            url: '/spreadsheets/reservations',
            data: {
                timestamp: 'Timestamp' + Date.now(),
                reservationDates: 'Reservation Dates' + Date.now(),
                location: 'Location' + Date.now(),
                occupancy: 'Occupancy' + Date.now(),
                firstName: 'First Name' + Date.now(),
                lastName: 'Last Name' + Date.now(),
                email: 'E-mail' + Date.now(),
                message: 'Message' + Date.now(),
                status: 'Status' + Date.now()
            }
        }).then(function successCallback(result) {
            $scope.result = result.data;
        }, function errorCallback(error) {
            $scope.result = error;
        });
    };

    $scope.getSpreadsheet = function() {
        $http({
            method: 'GET',
            url: '/spreadsheets/reservations'
        }).then(function successCallback(result) {
            $scope.result = result;
        }, function errorCallback(error) {
            $scope.result = error;
        });
    };
}]);
//endregion