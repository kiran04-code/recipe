    const dotenv = require("dotenv");
    dotenv.config();
    const express = require("express");
    const app = express();
    const path = require("path");
    const router = require("./routes/user")
    const routers = require("./routes/admin")
    const routess = require("./routes/coments")
    const FoodRoutes = require("./routes/food")
    const cookieparser = require("cookie-parser")
    const {connectDB} = require("./config/mongoDB");
    const {checkAuth} = require("./middleware/auth")
    const {checkAuth2} = require("./middleware/auth2")
    const ShopRoutes = require("./routes/shops")
    const port = process.env.PORT ||3010;
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.resolve("public")));
    app.set("view engine","ejs");
    app.set("views",path.resolve("./views"))
    app.use(cookieparser())
    app.use(checkAuth("token"))
    app.use(checkAuth2("Shop__access_Token"))

    connectDB(process.env.MONGO_URL,{
    ssl: true,
  sslValidate: false,
  tlsAllowInvalidCertificates: true
    }).then(()=>{
        console.log("Connected to MongoDB");

    }).catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    })

    app.use("/",router)
    app.use("/",routers)
    app.use("/",routess)
    app.use("/",ShopRoutes)
    app.use("/",FoodRoutes)
    app.listen(port,(req,res)=>{
        console.log(`Server is running on port ${port}`);
    })