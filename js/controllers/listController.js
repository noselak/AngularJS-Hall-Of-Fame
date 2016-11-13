MyApp.controller('listController', ['$scope', '$location', '$rootScope', '$http', '$q', 'reduceObjService', 'promiseArrService', function ($scope, $location, $rootScope, $http, $q, reduceObjService, promiseArrService) {
    $scope.$emit('LOAD');
    // temporary arrays for data processing
    var token = "f7dee70d1deec5fcfd0502373a8ea087f1bd32ff";
    $scope.userTempData1 = [];
    $scope.userTempData2 = [];
    $scope.userTempData3 = [];
    $scope.ngRepos = [];
    $scope.contributorsUrl = [];
    $scope.tempUsers = [];
    var promises = [];
    var userPromises = [];
    // array for user/contributors data
    $scope.users = [];
    $scope.maxSize = 5;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    
    $http
    // getting the list of angular repos
        .get("https://api.github.com/users/angular/repos", {
            params: {
                "access_token": token
            }
        }).then(function (response) {
            $scope.ngRepos = response.data;
            // getting the url to the contributors json
            for (var i = 0; i < $scope.ngRepos.length; i++) {
                $scope.contributorsUrl.push($scope.ngRepos[i].contributors_url);
            }
        
            return promiseArrService.promiseArr($scope.contributorsUrl, promises, $scope.contributorsUrl, token);

        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.userTempData1.push(data[i].data);
            }

            // merging contributors arrays into one array
            for (var j = 0; j < $scope.userTempData1.length; j++) {
                $scope.userTempData2 = $scope.userTempData2.concat($scope.userTempData1[j]);
            }
            // removing duplicates and calculating the sum of contributions made by each user (in case if any conributor made contributions in 2 or more repos. )
            $scope.userTempData3 = reduceObjService.reduceObj($scope.userTempData2, "login", "contributions");
    
        
            for (var x = 0; x < $scope.userTempData3.length; x++) {
                userPromises.push($http.get("http://api.github.com/users/" + $scope.userTempData3[x].login, {
                    params: {
                        "access_token": token
                    }
                }));
            }
            return $q.all(userPromises);

        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.tempUsers.push(data[i].data);
            }
            return $scope.tempUsers;
        })
        // merging user data with user/contributor objects;
        .then(function (data) {
            $scope.users = _.map($scope.tempUsers, function (base) {
                return _.extend(base, _.findWhere($scope.userTempData3, {
                    login: base.login
                }));               
            });
            $scope.$emit('UNLOAD');
        });
}]);