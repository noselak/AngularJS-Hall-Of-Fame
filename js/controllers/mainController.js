MyApp.controller('mainController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
        $scope.locate = $location.path();
    });
    
    $scope.sortColumn = 'login';
    
    $scope.$on('LOAD', function(){ $scope.loading=true});
    $scope.$on('UNLOAD', function(){ $scope.loading=false});
}]);