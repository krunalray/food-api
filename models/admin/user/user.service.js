const con = require("../../../config/database");
const crud = require("../../../utils/crud");
const bcrypt = require('bcrypt');
module.exports = {
  signin: async (username, callBack) => {
    try {
      var sql =
        "SELECT * FROM user WHERE (`email` = '" +
        username +
        "' || `username` = '" +
        username +
        "')";
      await con.query(sql, (error, results) => {
        if (error) {
          return callBack(null, { error: error });
        }
        return callBack(null, results[0]);
      });
    } catch (error) {
      console.log(" Error while get user " + error);
    }
  },
  getUsers: (filters, callBack) => {
    if (!filters) {
      filters = [];
    }

    var query = {};
    query.selection =
      "u.user_id, u.user_group_id,  u.username, u.firstname, u.lastname, u.email, u.image, u.ip, u.status, u.date_added, CONCAT(u.firstname, ' ',u.lastname) AS name, ug.name AS user_group_name ";
    query.condition = " u.is_delete = 0";

    if (filters.filter_username) {
      query.condition +=
        " AND u.username LIKE " +
        crud.escape("%" + filters.filter_username + "%") +
        "";
    }
    if (filters.filter_user_group_name) {
      query.condition +=
        " AND u.user_group_id= " +
        crud.escape(filters.filter_user_group_name) +
        "";
    }
    if (filters.filter_name) {
      query.condition +=
        " AND CONCAT(u.firstname, ' ', u.lastname) LIKE " +
        crud.escape("%" + filters.filter_name + "%") +
        "";
    }
    if (filters.filter_email) {
      query.condition +=
        " AND u.email LIKE " +
        crud.escape("%" + filters.filter_email + "%") +
        "";
    }
    if (filters.filter_status != "" && filters.filter_status != undefined) {
      query.condition +=
        " AND u.status = " + crud.escape(filters.filter_status) + "";
    }
    if (filters.sort != undefined) {
      query.sorting = " ORDER BY " + crud.escape(filters.sort);
    } else {
      query.sorting = " ORDER BY u.user_id";
    }
    if (filters.order != undefined && filters.order == "asc") {
      query.sorting += " ASC";
    } else {
      query.sorting += " DESC";
    }
    if (filters.start != undefined || filters.limit != undefined) {
      if (filters.start < 0) {
        filters.start = 0;
      }
      if (filters.limit < 1) {
        filters.limit = 20;
      }
      query.sorting +=
        " LIMIT " +
        crud.escape(filters.start) +
        "," +
        crud.escape(filters.limit);
    }

    crud.common(
      "`user` u LEFT JOIN `user_group` ug ON (u.user_group_id = ug.user_group_id)",
      function (err, result) {
        if (result != undefined && result.length) {
          callBack(null, result);
        } else {
          callBack(null, []);
        }
      },
      query
    );
  },
  getUserTotal: (filters, callback) => {
    if (!filters) {
      filters = [];
    }
    var query = {};
    query.selection = "COUNT(*) AS total";
    query.condition = " is_delete = 0";

    if (filters.filter_username) {
      query.condition +=
        " AND username LIKE " +
        crud.escape("%" + filters.filter_username + "%") +
        "";
    }
    if (filters.filter_user_group_name) {
      query.condition +=
        " AND user_group_id= " +
        crud.escape(filters.filter_user_group_name) +
        "";
    }
    if (filters.filter_name) {
      query.condition +=
        " AND CONCAT(firstname, ' ', lastname) LIKE " +
        crud.escape("%" + filters.filter_name + "%") +
        "";
    }
    if (filters.filter_email) {
      query.condition +=
        " AND email LIKE " + crud.escape("%" + filters.filter_email + "%") + "";
    }
    if (filters.filter_status != "" && filters.filter_status != undefined) {
      query.condition +=
        " AND status = " + crud.escape(filters.filter_status) + "";
    }

    crud.common(
      "user",
      function (err, result) {
        if (result != undefined && result.length) {
          if (result[0].total !== undefined && result[0].total) {
            callback(null, result[0]);
          } else {
            callback(null, { total: 0 });
          }
        } else {
          callback(null, { total: 0 });
        }
      },
      query
    );
  },
  getUserGroups: (filters, callback)=> {
    if(!filters) { filters = []; }
    var query = {};
    query.condition = "is_delete = 0";

    if(filters.filter_user_group_id) {
      query.condition += " AND user_group_id= "+ crud.escape(filters.filter_user_group_id) + "";
    }
    if(filters.filter_name){
      query.condition += " AND name LIKE "+ crud.escape('%'+filters.filter_name+'%') + "";
    }
    if (filters.filter_status != '' && filters.filter_status != undefined) {
      query.condition += " AND status = " +crud.escape(filters.filter_status)+ "";
    }
    if (filters.sort != undefined) {
      query.sorting = " ORDER BY "+ crud.escape(filters.sort);
    } else {
      query.sorting = " ORDER BY user_group_id";
    }
    if (filters.order != undefined && filters.order == 'asc') {
      query.sorting += " ASC";
    } else {
      query.sorting += " DESC";
    }
    if (filters.start != undefined || filters.limit != undefined) {
      if (filters.start < 0) {
        filters.start = 0;
      }
      if (filters.limit < 1) {
        filters.limit = 20;
      }
      query.sorting += " LIMIT "+ crud.escape(filters.start) + "," + crud.escape(filters.limit);
    }

    crud.common("user_group", function(err, result){
      if(result != undefined && result.length ){
        callback(null, result);
      } else {
        callback(null, []);
      }
    }, query);
  },
  getUserGroupsTotal: (filters, callback) => {
    if (!filters) {
      filters = [];
    }
    var query = {};
    query.selection = "COUNT(*) AS total";
    query.condition = " is_delete = 0";

    if (filters.filter_username) {
      query.condition +=
        " AND username LIKE " +
        crud.escape("%" + filters.filter_username + "%") +
        "";
    }
    if (filters.filter_user_group_name) {
      query.condition +=
        " AND user_group_id= " +
        crud.escape(filters.filter_user_group_name) +
        "";
    }
    if (filters.filter_name) {
      query.condition +=
        " AND CONCAT(firstname, ' ', lastname) LIKE " +
        crud.escape("%" + filters.filter_name + "%") +
        "";
    }
    if (filters.filter_email) {
      query.condition +=
        " AND email LIKE " + crud.escape("%" + filters.filter_email + "%") + "";
    }
    if (filters.filter_status != "" && filters.filter_status != undefined) {
      query.condition +=
        " AND status = " + crud.escape(filters.filter_status) + "";
    }

    crud.common(
      "user_group",
      function (err, result) {
        if (result != undefined && result.length) {
          if (result[0].total !== undefined && result[0].total) {
            callback(null, result[0]);
          } else {
            callback(null, { total: 0 });
          }
        } else {
          callback(null, { total: 0 });
        }
      },
      query
    );
  },
  checkExistingEmail: (data, callback)=> {
    con.acquire(function(err, con) {
      var query = {};
      query.selection = "COUNT(*) AS total";
      query.condition = "email=" + crud.escape(data.email) + " ";
      if(data.user_id != undefined) {
        query.condition += " AND user_id <> " + crud.escape(data.user_id) + "";
      }
      crud.common("`user`", function(err, result){
        callback(null, result[0].total);
      }, query);
    })
  },
  checkExistingUserName: (data, callback)=> {
    con.acquire(function(err, con) {
      var query = {};
      query.selection = "COUNT(*) AS total";
      query.condition = "username=" + crud.escape(data.username) + "";
      if(data.user_id != undefined) {
        query.condition += " AND user_id <> " + crud.escape(data.user_id) + "";
      }
      crud.common("user", function(err, result){
        callback(null, result[0].total);
      }, query);
    });
  },
  addUser: async (data, callback)=> {
    data.date_added = new Date().toISOString();
    data.date_modified = new Date().toISOString();

    let salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    crud.insert("user", data, function(err, result){
      callback(null, result)
    });
  },
  getUserById: async (user_id, callback)=> {
    var query = {};
    query.selection = "user_id, user_group_id, username, firstname, lastname, email, status, date_added";
    query.condition = "user_id = " + crud.escape(user_id) + " AND status = '1' AND is_delete = '0'";
    crud.common("`user`", function(err, result){
      if(result != undefined && result.length){
        callback(null, result[0]);
      } else {
        callback(null, false);
      }
    }, query);
  },


};
