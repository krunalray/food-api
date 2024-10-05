const joi = require("@hapi/joi");

const schema = {
    // register 
    register: joi.object({
        name: joi.string().max(50).required(),
        username: joi.string().max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirm_password: joi.string().required(),
    }),
    // login
    login: joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    }),
   
    
};

module.exports = schema;