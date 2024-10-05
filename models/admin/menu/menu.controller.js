const jwt = require('jwt-simple');
const admin_menu = require("./menu.service");
module.exports = {

  getAdminRoute: async(req,res)=>{
   
    try {

        var user_info = {};
        user_info.user_id = req.user.user_id;
        user_info.user_group_id = req.user.user_group_id;

        admin_menu.getRoute(user_info, function(err, result){
            var admin_new_menu = result;
            var main_manu = {};
            var admin_top_menu = [];
            var admin_side_menu = [];
            admin_menu.getRouteRestriction(user_info, function(err, result){
 
              var menu = [];
              var restricted_data = result;
           
              for(let admin_new_menu_item in admin_new_menu) {
                var settingStatus = true;
                if(admin_new_menu[admin_new_menu_item].route_setting_status != undefined && admin_new_menu[admin_new_menu_item].route_setting_status){
                  settingStatus = false;
                }
             
                if(settingStatus){
                  var restiction_status = true;
                  for(restricted_data_item in restricted_data) {
                    if(restricted_data[restricted_data_item].route != "") {
                      var restricted_data_regex = new RegExp(restricted_data[restricted_data_item].route);
                      if(restricted_data_regex.test(admin_new_menu[admin_new_menu_item].route) && admin_new_menu[admin_new_menu_item].route) {
                      }
                    }
                    if(restricted_data[restricted_data_item].model != "") {
                      var restricted_data_regex = new RegExp(restricted_data[restricted_data_item].model);
                      if(restricted_data_regex.test(admin_new_menu[admin_new_menu_item].model_keyword)) {
                      }
                    }
                  }
                  if(restiction_status) {
                    menu.push(admin_new_menu[admin_new_menu_item]);
                  }
                }  
              }
    
              var sub_menu = menu;
              var sub_sub_menu = menu;
    
              for(menu_item in menu) {
                if(menu[menu_item].parent_id == 0 && menu[menu_item].is_left == 1) {
                  var child_menu = [];
                  for(sub_menu_item in sub_menu) {
                    if(sub_menu[sub_menu_item].parent_id == menu[menu_item].admin_route_id && sub_menu[sub_menu_item].is_left == 1) {
                      var child_child_menu = [];
                      for(sub_sub_menu_item in sub_sub_menu) {
                        if(sub_sub_menu[sub_sub_menu_item].parent_id == sub_menu[sub_menu_item].admin_route_id && sub_sub_menu[sub_sub_menu_item].is_left == 1) {
                          child_child_menu.push(sub_sub_menu[sub_sub_menu_item]);
                        }
                      }
                      sub_menu[sub_menu_item]['sub_sub_menu'] = child_child_menu;
                      child_menu.push(sub_menu[sub_menu_item]);
                    }
                  }
                  menu[menu_item]['sub_menu'] = child_menu;
                  admin_side_menu.push(menu[menu_item]);
                }
                //console.log("menu[menu_item].is_top>>>>>>>>", menu[menu_item].is_top);
                if(menu[menu_item].is_top == 1) {
                  admin_top_menu.push(menu[menu_item]);
                  menu[menu_item].count = 0;
                }
              }
              console.log("----admin_side_menu",admin_side_menu);
              main_manu['menu_side'] = admin_side_menu;
              main_manu['menu_top'] = admin_top_menu;
              main_manu['menu_permission'] = restricted_data;
              main_manu['routes'] = admin_new_menu;
     
              res.send(main_manu);
            });
   
        });  
 

    }
    catch(error){
     console.log(" Error in login user " + error);
    }
  },

  
};
