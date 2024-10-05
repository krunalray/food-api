const con = require("../../../config/database");
const fs = require('fs')
module.exports={
  

    getSettings: async (data,callBack)=>{
        try{
            await con.query("select data_key, data_value, serialized  from setting",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })

        }catch(error){
            console.log(" Error while showing error " +error)
        }
    },

   
}
