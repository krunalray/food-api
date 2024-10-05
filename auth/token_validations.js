const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken:(req,res,next)=>{
        var token = req.get("Authorization");
        if(token){
            verify(token, process.env.SECRET_KEY,function(err,decoded){
                req.customer = decoded.result;
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    })
                }else{
                    next();
                }
            })
        }else{
           res.json({
            success:0,
            message: "Unauthorized access"
           })
        }
    }
}