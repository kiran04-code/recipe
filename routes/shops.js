const express = require("express")
const {cretashopuser ,shoplogin} = require("../controller/shopuser")
const ShopDetails = require('../model/shopsdeatils')
const food = require("../model/createfoodIteams")
const order = require("../model/orders")
const upload = require("../config/mult")
const {addShopDetails,createfoodIteams}  = require("../controller/shopDtails")

const ShopUser = require("../model/shopuser")
const router = express.Router()
router.get("/shoplogin",(req,res)=>{
res.render("shopsignin")    
})
router.get("/shopsignup",(req,res)=>{
res.render("shopsignup")    
})
router.post("/signupshop",cretashopuser)
router.post("/signingshop",shoplogin)
router.get("/logoutshops",(req,res)=>{
    res.clearCookie("Shop__access_Token").redirect("/")
})
router.get("/shop/profile", async (req, res) => {
  try {
    const data = await ShopUser.findById(req.shopuser);
    const data2 = await ShopDetails.find({createby:req.shopuser})
const data3 = await food
  .find({ createby: req.shopuser })
  .populate({
    path: 'NoofOrders',  // populate the orders inside food
    populate: { path: 'user', select: 'email' }  // then populate the user inside orders
  })
  .catch(err => {
    console.error(err);
  });

    if (!data2) {
      return res.status(404).send("User not found");
    }

  if(data===null){
   res.render("shopdetialsbutton")
  }else{
   res.render("shopProfile",{shopuser:data,ShopDetails:data2,products:data3,orders:data3});
  }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/register-shop",(req,res)=>{
    res.render("register-shop")
})
router.get("/create-food",(req,res)=>{
    res.render("createfoodIteams")
})
router.get("/delete/:id",async(req,res)=>{
   await food.findByIdAndDelete(req.params.id)
   res.redirect("/shop/profile")
})
router.post("/shop/create",addShopDetails)
router.post("/createfood",upload.single("FoodImage"),createfoodIteams)
module.exports  = router