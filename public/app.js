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
                timestamp: 'Timestamp',
                reservationDates: 'Reservation Dates',
                location: 'Location',
                occupancy: 'Occupancy',
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'E-mail',
                message: 'Message',
                status: 'Status'
            }
        }).then(function successCallback(result) {
            $scope.result = result;
        }, function errorCallback(error) {
            $scope.result = error;
        });
    };
}]);
//endregion