var iQl = /** @class */ (function () {
    function iQl() {
    }
    // este archivo necesita axios
    iQl.prototype.query = function (data) {
        var query;
        if (data["data"]["get"]) {
            query = this.buildQueryComplex(data);
        }
        else {
            query = this.querySelect(data);
        }
        return query;
    };
    iQl.prototype.buildQueryComplex = function (data) {
        var query = "";
        var get = data["data"]["get"];
        var set = data["data"]["set"];
        var type = data["data"]["type"];
        var where = data['where'];
        switch (type) {
            case "update":
                query = "UPDATE " + data["table"] + " SET " + this.queryUpdate(get, set) + " WHERE " + where['data'] + " = '" + where['value'] + "'";
                break;
            case "add":
                query = "INSERT INTO " + data["table"] + " " + this.queryAdd(get, set);
                break;
        }
        return query;
    };
    iQl.prototype.queryUpdate = function (gettr, settr) {
        var query = "";
        for (var index = 0; index < gettr.length; index++) {
            if (index == gettr.length - 1) {
                query = query + " " + gettr[index] + " = " + settr[index];
            }
            else {
                query = query + " " + gettr[index] + " = " + settr[index] + ",";
            }
        }
        return query;
    };
    iQl.prototype.queryAdd = function (gettr, settr) {
        var query = "";
        var values = "";
        for (var index = 0; index < gettr.length; index++) {
            if (index == gettr.length - 1) {
                query = "(" + query + " " + gettr[index] + " )";
                values = "(" + values + " '" + settr[index] + "' )";
            }
            else {
                query = query + " " + gettr[index] + ",";
                values = values + " '" + settr[index] + "',";
            }
        }
        return query + " VALUES " + values;
    };
    iQl.prototype.querySelect = function (data) {
        var query = "";
        var gettr = data["data"];
        var where = data['where'];
        for (var index = 0; index < gettr.length; index++) {
            if (index == gettr.length - 1) {
                query = query + " " + gettr[index];
            }
            else {
                query = query + " " + gettr[index] + ",";
            }
        }
        return "SELECT " + query + " FROM " + data["table"] + " WHERE " + where['data'] + " = '" + where['value'] + "'";
    };
    return iQl;
}());
