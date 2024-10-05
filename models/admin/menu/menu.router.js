const {
  userLogin,
  getUserList,
  getTotalUserList,
  getUserGroupList,
  addUser,
  getUserProfile,
  getTotalUserGroups,
} = require("../user/user.controller");

const {
  getAdminRoute
} = require("../menu/menu.controller");
const router = require("express").Router();
const passport = require("passport");
const passportService = require("../../../utils/passport");
const requireUserAuth = passport.authenticate("jwt-user", { session: false });

const {
  loginValidation,
} = require("../../../validation/admin/user/user.validation");

router.get("/app/admin/setting", requireUserAuth, getTotalUserGroups);

router.post("/user/login", loginValidation, userLogin);
router.post("/user/list", getUserList);
router.post("/user/list/total", getTotalUserList);
router.post("/user/add", requireUserAuth, addUser);
router.get("/user/profile", requireUserAuth, getUserProfile);
// user group
router.post("/user/user_group", requireUserAuth, getUserGroupList);
router.post("/user/user_group/total", requireUserAuth, getTotalUserGroups);
// menu
router.get("/admin_route", requireUserAuth, getAdminRoute);

module.exports = router;
