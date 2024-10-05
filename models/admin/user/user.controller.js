const language = require('../../../utils/language')
const user = require("./user.service");
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { sign } = require('jsonwebtoken');
const crud = require("../../../utils/crud");
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ user_id: user.user_id, iat: timestamp }, process.env.USER_KEY)
}

module.exports = {

  userLogin: async(req,res)=>{
    const user_data = req.body;
    const username = user_data.username;
    const password = user_data.password;
    try {
      if(!username || !password) {
        return res.status(400).send({error: language.SIGNIN_REQUIRED});
      }
      user.signin(username, async function(err, result){
        if (!result) {
          res.send({ status:401, error: "Not Found user " });
        }else{
          if (await bcrypt.compare(password, result.password)) {
            result.password = undefined;
            // const jsontoken = sign({ result: result }, process.env.ADMIN_SECRET_KEY);
            res.send({ status:200 ,token: tokenForUser(result)});
            // return res.json({
            //     success:1,
            //     message:"Logged in successfully",
            //     token: jsontoken,
            //     user: result
            // });
          }
        }
      });

    }
    catch(error){
     console.log(" Error in login user " + error);
    }
  },
  getUserList:async(req,res)=>{
    var filter_data = req.body.filter;
    user.getUsers(filter_data, function(err, result) {
      res.send(result);
    });
  },
  getTotalUserList:async(req,res)=>{
    var filter_data = req.body.filter;
    user.getUserTotal(filter_data, function(err, result) {
      res.send(result);
    });
  },
  addUser : async(req,res)=>{
    var formData = req.body.formData;
    formData.user_added = req.user.date_added;

    console.log("---formData",formData)
    if(formData && formData?.password == undefined) {
      res.send({ error: 'Password Required'});
    } else {
      user.checkExistingEmail(formData, function(err, email_result) {
        if(email_result <= 0) {
          user.checkExistingUserName(formData, function(err, username_result) {
            if(username_result <= 0) {
              user.addUser(formData, function(err, result) {
                res.send(result);
              });
            } else {
              res.send({ error: 'Username Exist'});
            }
          });
        } else {
          res.send({ error: 'Email already exist'});
        }
      });
    }
  },
  getUserProfile : async(req,res)=>{
      var query_user_data = {};
      var user_id = req.user.user_id;
      query_user_data.selection = "user_id, user_group_id, username, email, status, date_added";
      query_user_data.condition = " user_id = "+ crud.escape(user_id) +" AND status = '1'";
      crud.common("`user`", function(err, result) {
        if(result != undefined && result.length > 0) {
          res.send(result);
      
        } else {
          res.send({ error: 'Invalid login, Please contact administrator!'});
        }
      }, query_user_data);
     
  },
  getUserGroupList : async(req,res)=>{
    var filter_data = req.body.filter;
    user.getUserGroups(filter_data, function(err, result) {
      res.send(result);
      });
  },
  getTotalUserGroups : async(req,res)=>{
    var filter_data = req.body.filter;
    user.getUserGroupsTotal(filter_data, function(err, result){
      res.send(result);
    });
  },
  
};
