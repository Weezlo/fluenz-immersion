var myApp = angular.module('fluenzIntensiveTraining', ['ui.router', 'ngPrettyJson', 'ui.bootstrap', 'ngAnimate']);

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
myApp.controller('TestController', ['$scope', '$http', '$location', '$anchorScroll', function ($scope, $http, $location, $anchorScroll) {

    //region forms
    $scope.selections = [
        {name:'single', label:'SINGLE'},
        {name:'double', label:'DOUBLE'}
    ];

    $scope.occupancy = $scope.selections[0];
    $scope.location = 'MEXICO CITY';

    $scope.formOptions = [
        {
            heading:{
                week:'WEEK 1',
                date: 'JAN 8-13'
            },
            hidden: false,
            reservationDate: 'JAN 8-13',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            hidden: false,
            reservationDate: 'JAN 15-20',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            hidden: false,
            reservationDate: 'JAN 22-27',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        },{
            hidden: false,
            reservationDate: 'JAN/FEB 29-3',
            location: $scope.location,
            name: '',
            email: '',
            message: ''
        }
    ];

    $scope.expandFormRow = function(formOption){
        var index = $scope.formOptions.indexOf(formOption);
        for(var i = 0; i < $scope.formOptions.length; ++i){
            if(i !== index){
                $scope.formOptions[i] = {
                    hidden: false,
                    reservationDate: formOption.reservationDate,
                    location: $scope.location,
                    name: '',
                    email: '',
                    message: ''
                }
            } else {
                $scope.formOptions[i].hidden = true;
            }
        }
    };

    $scope.goTo = function(location){
        $location.hash(location);
        $anchorScroll();
    };
    //endregion

    //region HTTP calls
    $scope.placeReservation = function (formOption) {
        console.log('Calling node with a new reservation');
        $http({
            method: 'POST',
            url: '/spreadsheets/reservations',
            data: {
                timestamp: new Date(),
                reservationDates: formOption.reservationDate,
                location: formOption.location,
                occupancy: $scope.occupancy.name,
                firstName: formOption.name,
                lastName: formOption.name,
                reservationEmail: formOption.email,
                message: formOption.message,
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
    //endregion

//region DEBUG
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

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