const {
    login
} = require("./user.schema");

module.exports = {
    loginValidation: async (req, res, next) => {
       console.log("---req.body",req.body);
        const value = await login.validate(req.body);
 
        if (value.error) {
            res.json({
                status: 401,
                error: value.error.details[0].message
            })
        } else {
            next();
        }
    }
};