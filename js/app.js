//MODULE
var MyApp = angular.module('MyApp', ['ngRoute']);

//CONFIG
MyApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.htm', 
        controller: 'mainController'
    }).when('/list', {
        templateUrl: 'pages/list.htm', 
        controller: 'listController'
    })
});