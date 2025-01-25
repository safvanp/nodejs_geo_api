module.exports = {
    getUsers: function (data, id) {
        let result = [];
        data.company.forEach(function (obj) {
            if (typeof obj.id == "string") {
                if (obj.id == id) {
                    result.push(obj.users);
                }
            }
        });
        return result;
    },
    getUser: function (data, id, name) {
        let result = [];
        data.company.forEach(function (obj) {
            if (typeof obj.id == "string") {
                if (obj.id == id) {
                    obj.users.forEach(function (ob) {
                        if (ob.name == name) {
                            result.push(ob.location);
                        }
                    });
                }
            }
        });
        return result;
    },
    addUser: function (data, id, user) {
        let result = [];
        try {
            data.company.forEach(function (obj) {
                if (typeof obj.id == "string") {
                    if (obj.id == id) {
                        obj.users.push(user);
                        result.push(obj.users);
                    }
                }
            });
        } catch (err) {
            console.error(err)
        }
        return result
    },
    updateUser: function (data, id, userData) {
        var result = false;
        try {
            data.company.forEach(function (obj) {
                if (typeof obj.id == "string") {
                    if (obj.id == id) {
                        obj.users.push(userData.name);
                        result.push(obj.users);
                    }
                }
            });
        } catch (err) {
            console.error(err)
        }
        return result
    },
};