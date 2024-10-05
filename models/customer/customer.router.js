const { createCustomer,customerLogin } = require('../customer/costomer.controller');
const router = require('express').Router();
const {
    registerValidation,
    loginValidation
} = require('../../validation/customer/customer.validation');

router.post("/register",registerValidation, createCustomer);
router.post("/login",loginValidation, customerLogin);


module.exports = router;
