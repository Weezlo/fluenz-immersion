var myApp = angular.module('fluenzIntensiveTraining', ['ui.router', 'ngPrettyJson']);

myApp.config(function ($stateProvider) {
    //region debug
    // var helloState = {
    //     name: 'hello',
    //     url: '/hello',
    //     template: '<h3>hello world!</h3>'
    // };
    //
    // var aboutState = {
    //     name: 'about',
    //     url: '/about',
    //     template: '<h3>Its the UI-Router hello world app!</h3>'
    // };
    //
    // $stateProvider.state(helloState);
    // $stateProvider.state(aboutState);
    //endregion
});

//region Controllers
myApp.controller('TestController', ['$scope', '$http', function ($scope, $http) {
    $scope.selections = [
        {name:'single', label:'SINGLE'},
        {name:'double', label:'DOUBLE'}
    ];

    $scope.occupancy = $scope.selections[0];
    $scope.location = 'ANTIGUA';

    $scope.formOptions = [
        {
            reservationDate: 'JAN 8-13',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            reservationDate: 'JAN 15-20',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            reservationDate: 'JAN 22-27',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            reservationDate: 'JAN/FEB 29-3',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        }
    ];


    $scope.placeReservation = function () {
        console.log('Calling node with a new reservation');
        $http({
            method: 'POST',
            url: '/spreadsheets/reservations',
            data: {
                timestamp: new Date(),
                reservationDates: $scope.reservationDate,
                location: $scope.location,
                occupancy: $scope.occupancy.name,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                reservationEmail: $scope.reservationEmail,
                message: $scope.message,
                status: 'Pending'
            }
        }).then(function successCallback(result) {
            console.log('Success placing a reservation:', result.data);
        }, function errorCallback(error) {
            console.error('Error when reserving: ', error);
        });
    };

    $scope.requestBrochure = function(){
        console.log('Calling node with a brochure request');
        $http({
            method: 'POST',
            url: '/spreadsheets/brochure',
            data: {
                timestamp: new Date(),
                brochureEmail: $scope.brochureEmail,
                status: 'Pending'
            }
        }).then(function successCallback(result) {
            console.log('Success requesting a brochure:', result.data);
        }, function errorCallback(error) {
            console.error('Error when requesting a brochure: ', error);
        });
    };

//region DEBUG
//     $scope.getSpreadsheet = function() {
//         $http({
//             method: 'GET',
//             url: '/spreadsheets/reservations'
//         }).then(function successCallback(result) {
//             console.log('Success in $scope.getSpreadsheet(): %o', result);
//         }, function errorCallback(error) {
//             console.error('There was a problem in $scope.getSpreadsheet(): %o', error);
//         });
//     };
//endregion
}]);
//endregion