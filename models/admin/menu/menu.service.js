const con = require("../../../config/database");
const crud = require("../../../utils/crud");
const bcrypt = require('bcrypt');
module.exports = {
  menu: async (data, callback) => {
    var query = {};
    query.condition = "am.status = 1 AND am.app_group_id=" + crud.escape(data.app_group_id) + "";


    query.sorting = "ORDER BY am.sort_order ASC";
    crud.common("admin_menu am", function(err, result){
      callback(null, result);
    }, query);
  },
  menu_restriction: async (user, callback) => {
    var query = {};
    query.selection = "ur.route, ur.model, ur.admin_menu_id, ur.permission"
    query.condition = "ur.user_group_id = " + crud.escape(user.user_group_id ? user.user_group_id : 0) + " AND ur.status = 1 AND ur.is_delete = 0";
    crud.common("user_restriction ur", function(err, result){
      callback(null, result);
    }, query);
  },

getRoute : async (data, callback) => {
    var query = {};
    query.selection= "ar.*, ar.admin_route_id AS admin_menu_id";
    query.condition = "ar.status = '1' AND ar.is_delete = '0'";
    crud.common("admin_route ar", function(err, result){
      callback(null, result);
    }, query);
  },

  getRouteRestriction :  async(user, callback) =>{
    var query = {};
    query.selection = "ur.route, ur.model, ur.permission"
    query.condition = "ur.user_group_id = " + crud.escape(user.user_group_id ? user.user_group_id : 0) + " AND ur.status = 1 AND ur.is_delete = 0";
    crud.common("user_restriction ur", function(err, result){
      callback(null, result);
    }, query);
  }

};
