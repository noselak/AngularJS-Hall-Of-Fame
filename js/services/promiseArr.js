MyApp.service("promiseArrService", function ($http, $q) {
    this.promiseArr = function (arr1, promArr, getData, token) {
        for (var i = 0; i < arr1.length; i++) {
            promArr.push($http.get(getData[i], {
                params: {
                    "access_token": token
                }
            }));
        }
        return $q.all(promArr);
    }
});