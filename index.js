const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const PORT = process.env.PORT || 4000
// customer


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const customerRouter = require("./models/customer/customer.router")
const adminUserRouter = require("./models/admin/user/user.router")
const appRouter = require("./models/admin/app/app.router")
const adminMenuRouter = require("./models/admin/menu/menu.router")
app.get("/",(req,res)=>{
    res.json("Welcome to API")
});

app.use("/customer",customerRouter)
app.use("/admin",adminUserRouter)
app.use("/app",appRouter)
app.use("/admin",adminMenuRouter)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "GET,PUT,PATCH,DELETE,POST,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin');
    next();
});
app.listen(PORT,()=> console.log(`Server is Listening ${PORT}`))
