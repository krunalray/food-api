const con = require("../../config/database");
const _ = require('lodash');
module.exports = {
    register: async (data, callBack) => {
        try {
            var sql = "INSERT INTO `customer` SET   name = '" + data.name + "', username = '" + data.username + "', email = '" + data.email + "',  password = '" + data.password + "', salt = '" + data.salt + "', status='1', date_added= NOW(),is_delete='0'";
            await con.query(sql,
                (error, results, fields) => {
                    if (error) {
                        return callBack(null, { error: error });
                    }
                    return callBack(null, results)

                })

        } catch (error) {
            console.log(" Error while creating user " + error)
        }
    },
    isExistingCustomer: async (data, callBack) => {
        try {
            var sql = "SELECT email, username FROM customer WHERE (`email` = '" + data.email + "' || `username` = '" + data.username + "') LIMIT 1";
            await con.query(sql,
                (error, result, fields) => {
                    if (result != undefined && result.length > 0) {
                        if (result[0].email === data.email) {
                            callBack(null, "Email already exists!");
                        } else if (result[0].username === data.username) {
                            callBack(null, "username already exists!");
                        } else {
                            callBack(null, "Error: Either Email Or username already exists!");
                        }
                    } else {
                        callBack(null, false);
                    }
                }
            );
        } catch (error) {
            console.log(" Error whie getting user by email " + error)
        }
    },



}
