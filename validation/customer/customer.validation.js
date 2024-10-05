const {
    register,
    login
} = require("./customer.schema");

module.exports = {
    registerValidation: async (req, res, next) => {
        const value = await register.validate(req.body);
        if (value.error) {
            res.json({
                status: 401,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },
    loginValidation: async (req, res, next) => {
        const value = await login.validate(req.body);
        if (value.error) {
            res.json({
                status: 401,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
};