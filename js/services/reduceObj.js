MyApp.service("reduceObjService", function () {
    this.reduceObj = function(objArr, idkey, valkey) {
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
})