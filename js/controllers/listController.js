MyApp.controller('listController', ['$scope', '$location', '$rootScope', '$http', '$q', function ($scope, $location, $rootScope, $http, $q) {
    
    $scope.$emit('LOAD');
    
    // temporary arrays for data processing
    $scope.userTempData1 = [];
    $scope.userTempData2 = [];
    $scope.userTempData3 = [];
    $scope.angRepos = [];
    $scope.contributorsUrl = [];
    $scope.tempUsers = [];
    var promises = [];
    var userPromises = [];
    // array for user/contributors data
    $scope.users = [];
    
    $http
    // getting the list of angular repos
        .get("https://api.github.com/users/angular/repos", {
            params: {
                "access_token": "4f3f0fdcde9b8b4a266544368fe3b9bdd888c83b"
            }
        }).then(function (response) {
            $scope.angRepos = response.data;
            // getting the url to the contributors json
            for (var i = 0; i < $scope.angRepos.length; i++) {
                $scope.contributorsUrl.push($scope.angRepos[i].contributors_url);
            }
            return $scope.contributorsUrl;
        })
        // creating promises to get the lists of contributors
        .then(function (response) {
            for (var i = 0; i < $scope.contributorsUrl.length; i++) {
                promises.push($http.get($scope.contributorsUrl[i], {
                    params: {
                        "access_token": "4f3f0fdcde9b8b4a266544368fe3b9bdd888c83b"
                    }
                }));
            }
            // pushing the arrays with contributors into one array
            $q.all(promises).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.userTempData1.push(data[i].data);
                }
                // merging contributors arrays into one array
                for (var j = 0; j < $scope.userTempData1.length; j++) {
                    $scope.userTempData2 = $scope.userTempData2.concat($scope.userTempData1[j]);
                }
                // removing duplicates and calculating the sum of contributions made by each user (in case if any conributor made contributions in 2 or more repos. )
                $scope.userTempData3 = reduceObjArr($scope.userTempData2, "login", "contributions");
                return $scope.userTempData3;

                function reduceObjArr(objArr, idkey, valkey) {
                    var temp = {};
                    var obj = null;
                    for (var i = 0; i < objArr.length; i++) {
                        obj = objArr[i];
                        if (!temp[obj[idkey]]) {
                            temp[obj[idkey]] = obj;
                        }
                        else {
                            temp[obj[idkey]][valkey] += obj[valkey];
                        }
                    }
                    var result = [];
                    for (var prop in temp) result.push(temp[prop]);
                    return result;
                }
            }).then(function (response) {
                // creating promises to get the rest of the data of each user/contributor
                for (var x = 0; x < $scope.userTempData3.length; x++) {
                    userPromises.push($http.get("http://api.github.com/users/" + $scope.userTempData3[x].login, {
                        params: {
                            "access_token": "4f3f0fdcde9b8b4a266544368fe3b9bdd888c83b"
                        }
                    }));
                }
                // getting an array with user data objects;
                $q.all(userPromises).then(function (data) {
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
            });
        });
    
    
}]);