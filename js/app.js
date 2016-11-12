//MODULE
var MyApp = angular.module('MyApp', ['ngRoute', 'ui.bootstrap']);

//CONFIG
MyApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.htm'
    }).when('/list', {
        templateUrl: 'pages/list.htm'
    })
});


//FILTERS
MyApp.filter('startFrom', function(){
    return function(data, start){
       return data.slice(start); 
    }
})