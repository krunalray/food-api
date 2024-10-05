
const { getSettings } = require('./app.controller');
const router = require('express').Router();

router.get("/admin/setting", getSettings)


module.exports = router; 

