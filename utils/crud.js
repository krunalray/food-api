
const connection = require("../config/database");
var crypto = require('crypto');
var SqlString = require('sqlstring');

class Crud {
  constructor() {

    this.escape = function (value) {
      return SqlString.escape(value);
    };

    this.sqlFormat = function (sql, data) {
      return SqlString.format(sql, data);
    };
    this.common = function (table, callback, query_data) {

      connection.acquire(function (err, con) {
        var selection = '*';
        var condition = '';
        if (query_data) {
          if (query_data.selection && query_data.selection !== '' && query_data.selection != undefined) {
            selection = query_data.selection;
          }
          if (query_data.condition && query_data.condition !== '' && query_data.condition != undefined) {
            condition = query_data.condition;
          }
          if (query_data.sorting && query_data.sorting !== '' && query_data.sorting != undefined) {
            condition += ' ' + query_data.sorting;
          }
        }
        var query_string = 'SELECT ' + selection + ' FROM ' + table + " WHERE " + condition;
        console.log("CRUD Common : ", query_string);
        con.query(query_string, function (err, result) {

          con.release();
          callback(null, result);
        });
      });
    };

    this.list = function (table, callback, data) {
      if (data['select'] != undefined) {
        var select_column = data['select'];
      } else {
        var select_column = '*';
      }
      var sql = 'SELECT ' + select_column + ' FROM `' + table + '`';

      if (data['filter_data'] != undefined) {
        var where_string = '';
        for (filter in data['filter_data']) {
          where_string += "" + filter + " = '" + data['filter_data'][filter] + "' AND ";
        }
        where_string = where_string.substring(0, where_string.lastIndexOf("AND"));
        if (where_string) {
          sql += " WHERE " + where_string;
        }
      }

      if (data['order_by'] != undefined) {

        sql += " ORDER BY " + data['sort'];

        if (data['order'] != undefined && data['order'] == 'DESC') {
          sql += " DESC";
        } else {
          sql += " ASC";
        }
      }

      if (data['start'] != undefined || data['limit'] != undefined) {
        if (data['start'] < 0) {
          data['start'] = 0;
        }

        if (data['limit'] < 1) {
          data['limit'] = 20;
        }

        sql += " LIMIT " + data['start'] + "," + data['limit'];
      }
      console.log("CRUD List : ", sql);
      connection.acquire(function (err, con) {
        con.query(sql, function (err, result) {
          con.release();
          callback(null, result);
        });
      });
    };

    this.info = function (table, callback, data) {

      if (data['select'] != undefined) {
        var select_column = data['select'];
      } else {
        var select_column = '*';
      }
      var sql = 'SELECT ' + select_column + ' FROM `' + table + '`';

      if (data['filter_data'] != undefined) {
        var where_string = '';
        for (filter in data['filter_data']) {
          where_string += "" + filter + " = '" + data['filter_data'][filter] + "' AND ";
        }
        where_string = where_string.substring(0, where_string.lastIndexOf("AND"));
        if (where_string) {
          sql += " WHERE " + where_string;
        }
      }
      console.log("CRUD Info : ", sql);
      connection.acquire(function (err, con) {
        con.query(sql, function (err, result) {
          con.release();
          callback(null, result);
        });
      });
    };

    this.insert = function (table, data, callback) {
     
      var sql = 'INSERT INTO `' + table + '` SET ? ';
      if (data.date_added != undefined && data.date_added) {
        delete data.date_added;
        sql = 'INSERT INTO `' + table + '` SET date_added = NOW(), ? ';
      }
      connection.acquire(function (err, con) {
        console.log('----sql',data);
        con.query(sql, data, function (err, result) {
          con.release();
          if (err) { 
            console.log("-----error in insert",err)
          }
          callback(null, result);
        });
      });
      /*connection.acquire(function(err, con) {
        con.query('INSERT INTO `'+table+'` SET ? ', data, function(err, result) {
          con.release();
          if(err) {}
          callback(null, result);
        });
      });*/
    };

    this.update = function (table, id, id_value, data, callback) {
      connection.acquire(function (err, con) {
        //console.log('CRUD Update ==> UPDATE `'+table+'` SET ? WHERE '+id+' = '+id_value, data);
        con.query('UPDATE `' + table + '` SET ? WHERE app_id = ' + data.app_id + ' AND ' + id + ' = ' + id_value, data, function (err, result) {
          con.release();
          if (err) { console.log(err); }
          callback(null, result);
        });
      });
    };

    this.delete = function (table, id, id_value, app_id, callback) {
      connection.acquire(function (err, con) {
        //console.log('CRUD Delete', 'UPDATE `'+table+'` SET is_delete = 1 WHERE '+id+' = '+id_value);
        if (table == 'user_restriction') {
          var sql = 'UPDATE `' + table + '` SET is_delete = 1 WHERE ' + id + ' = ' + id_value;
        } else {
          var sql = 'UPDATE `' + table + '` SET is_delete = 1 WHERE app_id = ' + app_id + ' AND ' + id + ' = ' + id_value;
        }
        con.query(sql, function (err, result) {
          con.release();
          if (err) { console.log(err); }
          callback(null, result);
        });
      });
    };

    this.toFixed = function (n) {
      var prec = 2;
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
    };

    this.toFixedN = function (n, prec) {
      if (prec == undefined) {
        prec = 2;
      }
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
    };

  }
}
module.exports = new Crud();
